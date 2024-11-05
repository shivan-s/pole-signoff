import { superValidate, fail, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { hashPassword, getUUID } from '$lib/server/crypto';
import { createUser } from '$lib/server/db/users';
import { SignupSchema } from '$lib/utils';
import { LibsqlError } from '@libsql/client';
import { generateFakeStagehandle } from '$lib/utils/faker';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/');
	}
	const form = await superValidate(zod(SignupSchema));
	return {
		pageTitle: 'Signup',
		form,
		exampleUUID: getUUID(),
		exampleHandle: generateFakeStagehandle()
	};
};

export const actions: Actions = {
	signup: async ({ request, locals }) => {
		if (locals.user) {
			redirect(303, '/');
		}
		const form = await superValidate(request, zod(SignupSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const hash = await hashPassword(form.data.password);
		try {
			await createUser({ stageHandle: form.data.stagehandle, hash });
		} catch (err) {
			const DB_ERROR = 'SQLite error: UNIQUE constraint failed: users.stagehandle';
			if (err instanceof LibsqlError && err.message.includes(DB_ERROR)) {
				setError(
					form,
					`@${form.data.stagehandle} already exists. Please choose another stage handle`
				);
				return fail(400, { form });
			}
			throw err;
		}
		redirect(303, '/');
	}
};
