import { db } from '$lib/db';
import { usersTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(and(eq(usersTable.id, locals.user.id)));
	return {
		user,
		pageTitle: 'User Settings'
	};
};
