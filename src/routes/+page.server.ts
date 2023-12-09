import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './[level]/$types';

export const load: PageServerLoad = () => {
	throw redirect(303, '/1');
};
