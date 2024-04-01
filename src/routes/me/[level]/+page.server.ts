import type { Actions, PageServerLoad } from './$types';
import { levels, moves, userMoves } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	const db = locals.db;
	const results = await db
		.select()
		.from(userMoves)
		.leftJoin(moves, eq(userMoves.moveId, moves.id))
		.innerJoin(levels, eq(levels.id, moves.levelId))
		.where(eq(levels.level, parseInt(params.level)));
	return {
		results,
		level: params.level,
		pageTitle: `Level ${params.level}`
	};
};

export const actions: Actions = {
	// signoff: async ({ request, params }) => {
	// 	const formData = await request.formData();
	// 	const moveId = formData.get('id');
	// 	if (typeof moveId !== 'string') {
	// 		console.log('moveId is not valid type: ', moveId);
	// 		error(400, 'Bad data in form');
	// 	}
	// 	const parsedMoveId = parseInt(moveId);
	// 	if (isNaN(parsedMoveId)) {
	// 		console.log('moveId is not an integer');
	// 		error(400, 'Bad data in form');
	// 	}
	//
	// 	const moves = getMovesByLevel(parseInt(params.level));
	// 	const move = moves.get(parsedMoveId);
	// 	if (!move) {
	// 		console.log('moveId does not exist');
	// 		error(400, 'Bad data in form');
	// 	}
	// 	move.date = new Date();
	// 	// Simulates database call
	// 	await new Promise((r) => setTimeout(r, 1000));
	// 	moves.set(parsedMoveId, { ...move });
	// },
	// reset: async ({ params }) => {
	// 	resetMovesByLevel(parseInt(params.level));
	// }
};
