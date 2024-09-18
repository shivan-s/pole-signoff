import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return json(
		{
			message: 'ok'
		},
		{
			status: 200
		}
	);
};
