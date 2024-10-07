import { fetchUserByStageHandle } from '$lib/server/db/users';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = await fetchUserByStageHandle(params.stageHandle);
	if (params.stageHandle !== params.stageHandle.toLowerCase()) {
		redirect(303, `/@${params.stageHandle.toLowerCase()}`);
	}
	console.log(user);
	if (!user || user.isPrivate) {
		error(404, 'Not Found');
	}
	return {
		pageTitle: `@${user.stagehandle}`
	};
};
