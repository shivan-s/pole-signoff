import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getLevels, getMovesByLevel, resetMovesByLevel } from '$lib/db';

export const load: PageServerLoad = ({ params }) => {
	const levels = getLevels();
	if (!levels.has(parseInt(params.level))) {
		throw error(404);
	}
	const moves = getMovesByLevel(parseInt(params.level));
	const complete = [...moves].filter(([, v]) => v.date === null).length === 0;
	return {
		level: params.level,
		moves,
		complete,
		pageTitle: `Level ${params.level}`
	};
};

export const actions: Actions = {
	signoff: async ({ request, params }) => {
		const formData = await request.formData();
		const moveId = formData.get('id');
		if (typeof moveId !== 'string') {
			console.log('moveId is not valid type: ', moveId);
			throw error(400, 'Bad data in form');
		}
		const parsedMoveId = parseInt(moveId);
		if (isNaN(parsedMoveId)) {
			console.log('moveId is not an integer');
			throw error(400, 'Bad data in form');
		}

		const moves = getMovesByLevel(parseInt(params.level));
		const move = moves.get(parsedMoveId);
		if (!move) {
			console.log('moveId does not exist');
			throw error(400, 'Bad data in form');
		}
		move.date = new Date();
		// Simulates database call
		await new Promise((r) => setTimeout(r, 1000));
		moves.set(parsedMoveId, { ...move });
	},
	reset: async ({ params }) => {
		resetMovesByLevel(parseInt(params.level));
	}
};
