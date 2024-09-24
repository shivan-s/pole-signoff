import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad, Actions } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
	};
};

export const action: Actions = {
	logout: async ({ locals, cookies }) => {
		if (locals.user) {
			cookies.delete('auth-token', { httpOnly: true, path: '/' });
			return redirect(303, '/login');
		}
	}
};
