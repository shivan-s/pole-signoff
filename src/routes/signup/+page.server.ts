import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/crypto';
import { createUser } from '$lib/server/db/users';

const SignupSchema = z
	.object({
		stagehandle: z
			.string()
			.trim()
			.min(6)
			.max(16)
			.toLowerCase()
			.refine(
				(data) => /^[a-z\._0-9]*$/.test(data),
				"Stage handle can only contain lower case letters (a-z), '.' and/or '_'"
			),
		password: z.string().trim().min(8).max(128)
	})
	.strip();

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/login');
	}
	const form = await superValidate(zod(SignupSchema));
	return {
		pageTitle: 'Signup',
		form
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
			await createUser({ username: form.data.stagehandle, hash });
		} catch (err) {
			console.log(err);
			// if (err instanceof postgres.PostgresError && err.code === DBErrorUniqueViolationCode) {
			// 	ctx.addIssue({
			// 		code: z.ZodIssueCode.custom,
			// 		path: ['username'],
			// 		message: `'${data.username}' already exists. Please choose another username`
			// 	});
			// 	return data;
			// }
			throw err;
		}
		redirect(303, '/');
	}
};
