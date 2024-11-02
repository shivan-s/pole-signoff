import type { PageServerLoad, Actions } from './$types';
import { fetchManyUsers, updateUserLastLoginById } from '$lib/server/db/users';
import { WAVE } from '$lib/characters';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import { issueJWT, checkPassword } from '$lib/server/crypto';
import { fetchUserWithPasswordByStageHandle } from '$lib/server/db/users';
import { LoginSchema } from '$lib/utils';
import { generateFakeStagehandle } from '$lib/utils/faker';

export const load: PageServerLoad = async ({ url }) => {
	const rawUsers = await fetchManyUsers({ includePrivate: true, limit: 10 });
	const users = rawUsers.map((u) => {
		if (u.isPrivate) {
			return {
				isPrivate: true,
				stagehandle: `?${generateFakeStagehandle(u.id)}?`,
				createdAt: u.createdAt
			};
		}
		return {
			isPrivate: false,
			stagehandle: u.stagehandle,
			createdAt: u.createdAt
		};
	});
	const form = await superValidate(zod(LoginSchema));
	const isSignup = url.searchParams.get('signup') === '1';
	return {
		pageTitle: `${WAVE} Welcome to Pole Academy`,
		users,
		form,
		isSignup
	};
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		console.time('login');
		const form = await superValidate(request, zod(LoginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		// NOTE: Ensure no time-based attacks, hence set errors at end
		const user = await fetchUserWithPasswordByStageHandle(form.data.stagehandle);
		const validLogin = await checkPassword(form.data.password, user);
		if (!validLogin || !user) {
			if (!user) {
				console.timeLog('login', 'StageHandle is invalid');
				console.timeEnd('login');
			}
			if (!validLogin) {
				console.timeLog('login', 'Password is invalid');
				console.timeEnd('login');
			}
			return setError(form, '', 'Incorrect username or password');
		}
		console.timeLog('login', 'Login Success for: ', user.users.stagehandle);
		const jwt = await issueJWT(user.users);
		cookies.set('auth-token', jwt, { httpOnly: true, path: '/' });
		updateUserLastLoginById(user.users.id);
		locals.user = user.users;
		console.timeEnd('login');
		redirect(303, '/');
	},
	logout: async ({ locals, cookies }) => {
		if (locals.user) {
			cookies.delete('auth-token', { httpOnly: true, path: '/' });
			return redirect(303, '/');
		}
	}
};
