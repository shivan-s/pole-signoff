import { drizzle } from 'drizzle-orm/d1';
import { redirect, type Handle } from '@sveltejs/kit';

const WHITELISTED_PATHS: readonly string[] = ['/login', '/signup', '/logout'];

export const handle: Handle = async ({ event, resolve }) => {
	const requestPath = event.url.pathname;
	const authToken = event.cookies.get('auth-token');
	if (!authToken && !WHITELISTED_PATHS.includes(requestPath)) {
		redirect(302, '/login');
	}
	event.locals.db = drizzle(event.platform!.env.DB);
	return await resolve(event);
};
