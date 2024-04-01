import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
	return {
		...data,
		routeURL: url.pathname
	};
};
