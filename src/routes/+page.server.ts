import type { PageServerLoad, Actions } from './$types';
import { fetchManyUsers } from '$lib/db/users';
import { PAGE_LIMIT } from '$lib/utils';

const WAVE = '👋';

export const load: PageServerLoad = async ({ locals, url }) => {
	const cursor = parseInt(url.searchParams.get('cursor') || '0');
	const users = await fetchManyUsers({
		limit: PAGE_LIMIT,
		offset: cursor * PAGE_LIMIT
	});
	const isNextPage =
		(await fetchManyUsers({ limit: 1, offset: PAGE_LIMIT * (cursor + 1) })).length > 0;
	return {
		pageTitle: `${WAVE} Pole Rocks`,
		isNextPage,
		users,
		cursor
	};
};

export const actions: Actions = {};
