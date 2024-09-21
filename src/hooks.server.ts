import { fetchUserById } from '$lib/server/db/users';
import { decodeJWT } from '$lib/server/crypto';
import { redirect, type Handle } from '@sveltejs/kit';

const WHITELISTED_PATHS: readonly string[] = ['/', '/login', '/signup', '/healthz'];

export const handle: Handle = async ({ event, resolve }) => {
	const requestPath = event.url.pathname;
	console.log('Path:', requestPath);
	const authToken = event.cookies.get('auth-token');
	if (authToken === undefined && !WHITELISTED_PATHS.includes(requestPath)) {
		redirect(302, '/login');
	} else if (authToken) {
		const payload = await decodeJWT(authToken);
		if (!payload) {
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
