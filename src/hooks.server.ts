import { dev } from '$app/environment';
import { decodeJWT } from '$lib/server/crypto';
import { fetchUserById } from '$lib/server/db/users';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Debugging
	if (dev) {
		const requestPath = event.url.pathname;
		console.log('Path:', requestPath);
	}
	// Verify User
	const authToken = event.cookies.get('auth-token');
	if (authToken) {
		const payload = await decodeJWT(authToken);
		if (!payload || !payload.user) {
			event.cookies.delete('auth-token', { httpOnly: true, path: '/' });
			redirect(302, '/');
		}
		const user = await fetchUserById(payload.user?.id);
		if (!user) {
			event.cookies.delete('auth-token', { httpOnly: true, path: '/' });
			redirect(302, '/');
		}
		event.locals.user = user;
	}
	return await resolve(event);
};
