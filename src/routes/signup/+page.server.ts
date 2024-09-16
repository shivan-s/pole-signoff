import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { passwordsTable, usersTable } from '$lib/db/schema';
import bcrypt from 'bcryptjs';
import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { DBErrorUniqueViolationCode } from '$lib/db/error';
import postgres from 'postgres';

const SignupSchema = z
	.object({
		username: z.string().trim().min(6).max(32),
		password: z.string().trim().min(8).max(128)
	})
	.strip()
	.transform(async (data, ctx) => {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.password, salt);
		try {
			await db.transaction(async (tx) => {
				const [newUser] = await tx
					.insert(usersTable)
					.values({ username: data.username })
					.returning({ id: usersTable.id });
				await tx.insert(passwordsTable).values({ userId: newUser.id, hash });
				return newUser;
			});
			return data;
		} catch (err) {
			if (err instanceof postgres.PostgresError && err.code === DBErrorUniqueViolationCode) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['username'],
					message: `'${data.username}' already exists. Please choose another username`
				});
				return data;
			}
			throw err;
		}
	});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/');
	}
	const form = await superValidate(zod(SignupSchema));
	return {
		pageTitle: 'Signup',
		form
	};
};

export const actions: Actions = {
	signup: async ({ request }) => {
		const form = await superValidate(request, zod(SignupSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		redirect(303, '/');
	}
};
