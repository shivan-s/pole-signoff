import { moves, userMoves } from '$lib/db/schema';
import { asc, count, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userLevels = await locals.db
		.select({ level: moves.level, count: count(moves.level) })
		.from(userMoves)
		.innerJoin(moves, eq(userMoves.moveId, moves.id))
		.orderBy(asc(moves.level))
		.groupBy(moves.level);
	if (userLevels.length === 0) {
		userLevels.push({
			level: 1,
			count: 0
		});
	}
	return {
		formId: uuid(),
		userLevels
	};
};
