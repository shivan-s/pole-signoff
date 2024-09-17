import { db } from '$lib/db';
import { usersTable } from '$lib/db/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

const WHITELISTED_PATHS: readonly string[] = ['/', '/login', '/signup'];

export const handle: Handle = async ({ event, resolve }) => {
	const requestPath = event.url.pathname;
	console.log('Path:', requestPath);
	const authToken = event.cookies.get('auth-token');
	if (authToken === undefined && !WHITELISTED_PATHS.includes(requestPath)) {
		redirect(302, '/');
	} else if (authToken) {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, parseInt(authToken)));
		event.locals.user = user;
	}
	return await resolve(event);
};
