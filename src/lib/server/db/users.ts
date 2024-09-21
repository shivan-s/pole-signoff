import { and, desc, eq, ilike, isNotNull, isNull } from 'drizzle-orm';
import { db } from '.';
import { passwordsTable, usersTable, type Password, type User } from './schema';
import { PAGE_LIMIT } from '$lib/constants';

/**
 * Obtain list of users with cursor pagination
 *
 * @param params `username` to search; `offset`, `limit` is for pagination
 * @returns Array of users ordered by descending created
 */
export async function fetchManyUsers(params: {
	username?: string | null;
	offset?: number;
	limit?: number;
	includeDeleted?: boolean;
	includeVerfied?: boolean;
}): Promise<User[]> {
	const users = await db
		.select()
		.from(usersTable)
		.limit(params.limit ?? PAGE_LIMIT)
		.offset(params.offset ?? 0)
		.where(
			and(
				params.includeDeleted ? undefined : isNull(usersTable.deletedAt),
				params.includeVerfied ? undefined : isNotNull(usersTable.verifiedAt),
				params.username ? ilike(usersTable.username, '%' + params.username + '%') : undefined
			)
		)
		.orderBy(desc(usersTable.createdAt));
	return users;
}

/**
 * Obtain a user by `username` and comes with hashed password to check
 *
 * @param username as on `users` table
 * @returns User with Password
 */
export async function fetchUserWithPasswordByUsername(
	username: string,
	opts?: { includeDeleted?: boolean }
): Promise<{ users: User; passwords: Password } | undefined> {
	const [user] = await db
		.selectDistinctOn([passwordsTable.userId])
		.from(usersTable)
		.innerJoin(passwordsTable, eq(usersTable.id, passwordsTable.userId))
		.orderBy(desc(passwordsTable.userId), desc(passwordsTable.createdAt))
		.where(
			and(
				eq(usersTable.username, username),
				opts?.includeDeleted ? undefined : isNull(usersTable.deletedAt)
			)
		);
	return user;
}

/**
 *  Obtain a user using 'id'
 *
 * @param id User ID
 * @returns User
 */
export async function fetchUserById(
	id: number,
	opts?: { includeDeleted?: boolean }
): Promise<User | undefined> {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(
			and(eq(usersTable.id, id), opts?.includeDeleted ? undefined : isNull(usersTable.deletedAt))
		);
	return user;
}
