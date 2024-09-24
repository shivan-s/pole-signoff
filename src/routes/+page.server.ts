import type { PageServerLoad, Actions } from './$types';
import { fetchManyUsers } from '$lib/server/db/users';
import { WAVE } from '$lib/characters';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { issueJWT, checkPassword } from '$lib/server/crypto';
import { fetchUserWithPasswordByUsername } from '$lib/server/db/users';

export const load: PageServerLoad = async ({ url }) => {
	const users = await fetchManyUsers();
	const form = await superValidate(zod(LoginSchema));
	const isSignup = url.searchParams.get('signup') === '1';
	return {
		pageTitle: `${WAVE} Welcome to Pole Rocks`,
		users,
		form,
		isSignup
	};
};

const LoginSchema = z
	.object({
		username: z.string().trim().min(6).max(32),
		password: z.string().trim().min(8).max(128)
	})
	.strip();

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		console.time('login');
		const form = await superValidate(request, zod(LoginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		// NOTE: Ensure no time-based attacks, hence set errors at end
		const user = await fetchUserWithPasswordByUsername(form.data.username);
		const validLogin = await checkPassword(form.data.password, user);
		if (!validLogin || !user) {
			if (!user) {
				console.timeLog('login', 'Username is invalid');
			}
			if (!validLogin) {
				console.timeLog('login', 'Password is invalid');
			}
			return setError(form, '', 'Incorrect username or password');
		}
		console.timeLog('login', 'Login Success for: ', user.users.username);
		const jwt = await issueJWT(user.users);
		cookies.set('auth-token', jwt, { httpOnly: true, path: '/' });
		locals.user = user.users;
		console.timeEnd('login');
		return redirect(303, '/me');
	},
	logout: async ({ locals, cookies }) => {
		if (locals.user) {
			cookies.delete('auth-token', { httpOnly: true, path: '/' });
			return redirect(303, '/login');
		}
	}
};
