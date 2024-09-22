import { and, desc, eq, isNull, like } from 'drizzle-orm';
import { passwordsTable, usersTable, type SelectPassword, type SelectUser } from './schema';
import { PAGE_LIMIT } from '$lib/constants';
import type { Hash } from '$lib/server/crypto';
import { db } from '$lib/server/db';

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
}): Promise<SelectUser[]> {
	const users = await db
		.select()
		.from(usersTable)
		.limit(params.limit ?? PAGE_LIMIT)
		.offset(params.offset ?? 0)
		.where(
			and(
				params.includeDeleted ? undefined : isNull(usersTable.deletedAt),
				params.username ? like(usersTable.username, '%' + params.username + '%') : undefined
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
): Promise<{ users: SelectUser; passwords: SelectPassword } | undefined> {
	const [user] = await db
		.select()
		.from(usersTable)
		.innerJoin(passwordsTable, eq(usersTable.id, passwordsTable.userId))
		.orderBy(desc(passwordsTable.userId), desc(passwordsTable.createdAt))
		.where(
			and(
				eq(usersTable.username, username),
				opts?.includeDeleted ? undefined : isNull(usersTable.deletedAt)
			)
		)
		.limit(1);
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
): Promise<SelectUser | undefined> {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(
			and(eq(usersTable.id, id), opts?.includeDeleted ? undefined : isNull(usersTable.deletedAt))
		);
	return user;
}

/**
 * Creates a user onto the database with password
 *
 * @param user `username` and `hash`
 * @see `hashPassword` in order to create a hash
 */
export async function createUser(user: { username: string; hash: Hash }): Promise<SelectUser> {
	return await db.transaction(
		async (tx) => {
			const [newUser] = await tx.insert(usersTable).values({ username: user.username }).returning();
			await tx.insert(passwordsTable).values({ userId: newUser.id, hash: user.hash.hash });
			return newUser;
		},
		{ behavior: 'deferred' }
	);
}
