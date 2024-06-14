import type { Actions, PageServerLoad } from './$types';
import { moves, userMoves } from '$lib/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const db = locals.db;
	const levelMoves = await db
		.select({
			id: moves.id,
			name: moves.name,
			description: moves.description,
			achievedAt: userMoves.achievedAt
		})
		.from(userMoves)
		.rightJoin(moves, eq(userMoves.moveId, moves.id))
		.where(and(eq(moves.level, parseInt(params.level)), isNull(moves.deletedAt)));
	return {
		moves: levelMoves,
		level: params.level,
		pageTitle: `Level ${params.level}`
	};
};

export const actions: Actions = {
	signoff: async ({ request, params, locals }) => {
		const db = locals.db;
		const formData = await request.formData();
		const moveId = formData.get('id');
		if (typeof moveId !== 'string') {
			console.log('moveId is not valid type: ', moveId);
			error(400, 'Invalid data in form');
		}
		const levelMoves = await db
			.select({
				id: moves.id,
				name: moves.name,
				description: moves.description,
				achievedAt: userMoves.achievedAt
			})
			.from(userMoves)
			.rightJoin(moves, eq(userMoves.moveId, moves.id))
			.where(and(eq(moves.level, parseInt(params.level)), isNull(moves.deletedAt)));
		if (!levelMoves.map((v) => v.id).includes(parseInt(moveId))) {
			console.log('moveId is not found for level');
			error(400, 'Invalid data in form');
		}
		await db
			.insert(userMoves)
			.values({ achievedAt: String(new Date()), userId: 1, moveId: parseInt(moveId) });
	}

	// signoff: async ({ request, params }) => {
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
