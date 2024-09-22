import { decodeJWT } from '$lib/server/crypto';
import { fetchUserById } from '$lib/server/db/users';
import { redirect, type Handle } from '@sveltejs/kit';

const WHITELISTED_PATHS: readonly string[] = ['/', '/login', '/signup', '/healthz'];

export const handle: Handle = async ({ event, resolve }) => {
	// Debugging
	const requestPath = event.url.pathname;
	console.log('Path:', requestPath);
	// Verify User
	const authToken = event.cookies.get('auth-token');
	if (authToken === undefined && !WHITELISTED_PATHS.includes(requestPath)) {
		redirect(302, '/login');
	} else if (authToken) {
		const payload = await decodeJWT(authToken);
		if (!payload || !payload.user) {
			event.cookies.delete('auth-token', { httpOnly: true, path: '/' });
			redirect(302, '/login');
		}
		const user = await fetchUserById(payload.user?.id);
		if (!user) {
			event.cookies.delete('auth-token', { httpOnly: true, path: '/' });
			redirect(302, '/login');
		}
		event.locals.user = user;
	}
	return await resolve(event);
};
