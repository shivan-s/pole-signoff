import { moves, userMoves } from '$lib/db/schema';
import { asc, count, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userLevels = await locals.db
		.select({ level: moves.level, count: count(moves.level) })
		.from(userMoves)
		.innerJoin(moves, eq(userMoves.moveId, moves.id))
		.orderBy(asc(moves.level))
		.groupBy(moves.level);
	return {
		userLevels
	};
};
