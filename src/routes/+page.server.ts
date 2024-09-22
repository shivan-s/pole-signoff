import type { PageServerLoad, Actions } from './$types';
import { PAGE_LIMIT } from '$lib/constants';

const WAVE = '👋';

export const load: PageServerLoad = async ({ url, locals }) => {
	const q = url.searchParams.get('q');
	const cursor = parseInt(url.searchParams.get('cursor') || '0');
	const users = await locals.db.user.fetchMany({
		username: q,
		limit: PAGE_LIMIT,
		offset: cursor * PAGE_LIMIT
	});
	const isNextPage =
		(
			await locals.db.user.fetchMany({
				username: q,
				limit: 1,
				offset: PAGE_LIMIT * (cursor + 1)
			})
		).length > 0;
	return {
		pageTitle: `${WAVE}`,
		isNextPage,
		users,
		cursor,
		q
	};
};

export const actions: Actions = {};
