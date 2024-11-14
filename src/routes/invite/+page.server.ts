import { fetchInviteCodesFromUser } from '$lib/server/db/inviteCodes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const inviteCodes = await fetchInviteCodesFromUser(locals.user.id);
	return {
		inviteCodes,
		user: locals.user,
		pageTitle: 'Invite Codes'
	};
};
