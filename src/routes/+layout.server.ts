import { movesTable, userMovesTable } from '$lib/db/schema';
import { asc, count, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userLevels = await db
		.select({ level: movesTable.level, count: count(movesTable.level) })
		.from(userMovesTable)
		.innerJoin(movesTable, eq(userMovesTable.moveId, movesTable.id))
		.orderBy(asc(movesTable.level))
		.groupBy(movesTable.level);
	if (userLevels.length === 0) {
		userLevels.push({
			level: 1,
			count: 0
		});
	}
	return {
		formId: uuid(),
		userLevels,
		user: locals.user
	};
};
