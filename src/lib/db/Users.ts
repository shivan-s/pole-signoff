import { and, ilike, isNotNull, isNull } from 'drizzle-orm';
import { db } from '.';
import { usersTable } from './schema';
import { PAGE_LIMIT } from '$lib/utils';

export async function fetchManyUsers(params: {
	username?: string;
	offset?: number;
	limit?: number;
}) {
	return await db
		.select()
		.from(usersTable)
		.limit(params.limit ?? PAGE_LIMIT)
		.offset(params.offset ?? 0)
		.where(
			and(
				isNull(usersTable.deletedAt),
				isNotNull(usersTable.verfiedAt),
				params.username ? ilike(usersTable.username, '%' + params.username + '%') : undefined
			)
		);
}
