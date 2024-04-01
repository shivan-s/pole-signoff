import { drizzle } from 'drizzle-orm/d1';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = drizzle(event.platform!.env.DB);
	return await resolve(event);
};
