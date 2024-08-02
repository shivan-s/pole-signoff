import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { passwordsTable, usersTable } from '$lib/db/schema';
import bcrypt from 'bcryptjs';
import { desc, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/db';

const LoginSchema = z.object({
	username: z.string().trim().min(6).max(32),
	password: z.string().trim().min(8).max(128)
});

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(LoginSchema));
	return {
		pageTitle: locals.user ? 'Home' : 'Welcome to Pole Signoff',
		form
	};
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, zod(LoginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const [user] = await db
			.selectDistinctOn([passwordsTable.userId])
			.from(usersTable)
			.innerJoin(passwordsTable, eq(usersTable.id, passwordsTable.userId))
			.orderBy(desc(passwordsTable.userId), desc(passwordsTable.createdAt))
			.where(eq(usersTable.username, form.data.username));
		if (!user) {
			console.log('username does not exist: ', form.data.username);
			error(401, 'Incorrect email or password');
		}
		const validLogin = await bcrypt.compare(form.data.password, user.passwords.hash);
		if (validLogin) {
			locals.user = {
				...user.users
			};
			cookies.set('auth-token', user.users.id.toString(), { httpOnly: true, path: '/' });
		} else {
			console.log('password is invalid');
			error(401, 'Incorrect email or password');
		}
	}
};
