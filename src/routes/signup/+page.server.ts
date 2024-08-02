import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { passwordsTable, usersTable } from '$lib/db/schema';
import bcrypt from 'bcryptjs';
import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import { PostgresError } from 'postgres';
import { DBErrorUniqueViolationCode } from '$lib/db/error';

const SignupSchema = z.object({
	username: z.string().trim().min(6).max(32),
	password: z.string().trim().min(8).max(128)
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
			console.log('form invalid');
			return fail(400, { form });
		}
		const username = form.data.username;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(form.data.password, salt);
		try {
			await db.transaction(async (tx) => {
				const [newUser] = await tx
					.insert(usersTable)
					.values({ username })
					.returning({ id: usersTable.id });
				await tx.insert(passwordsTable).values({ userId: newUser.id, hash });
			});
		} catch (err) {
			if (err instanceof PostgresError && err.code === DBErrorUniqueViolationCode) {
				console.log('username already exists');
				error(400, `'${username}' already exists. Please choose another username`);
			}
			throw err;
		}
	}
};
