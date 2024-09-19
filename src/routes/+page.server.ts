import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { usersTable } from '$lib/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const users = await db
		.select({ username: usersTable.username })
		.from(usersTable)
		.limit(10)
		.execute();
	return {
		pageTitle: locals.user ? `Hi, ${locals.user.username}` : 'Welcome to Pole Signoff',
		users
	};
};

export const actions: Actions = {};
