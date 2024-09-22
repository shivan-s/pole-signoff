import { and, desc, eq, ilike, isNull } from 'drizzle-orm';
import { passwordsTable, usersTable, type SelectPassword, type SelectUser } from './schema';
import { PAGE_LIMIT } from '$lib/constants';
import type { Hash } from '$lib/server/crypto';
import { type DrizzleD1Database } from 'drizzle-orm/d1';

/**
 * User related methods
 */
class User {
	#db;
	constructor(db: DrizzleD1Database) {
		this.#db = db;
	}
	/**
	 * Obtain list of users with cursor pagination
	 *
	 * @param params `username` to search; `offset`, `limit` is for pagination
	 * @returns Array of users ordered by descending created
	 */
	async fetchMany(params: {
		username?: string | null;
		offset?: number;
		limit?: number;
		includeDeleted?: boolean;
	}): Promise<SelectUser[]> {
		const users = await this.#db
			.select()
			.from(usersTable)
			.limit(params.limit ?? PAGE_LIMIT)
			.offset(params.offset ?? 0)
			.where(
				and(
					params.includeDeleted ? undefined : isNull(usersTable.deletedAt),
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
	async fetchOneWithPasswordByUsername(
		username: string,
		opts?: { includeDeleted?: boolean }
	): Promise<{ users: SelectUser; passwords: SelectPassword } | undefined> {
		const [user] = await this.#db
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
	async fetchById(
		id: number,
		opts?: { includeDeleted?: boolean }
	): Promise<SelectUser | undefined> {
		const [user] = await this.#db
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
	async create(user: { username: string; hash: Hash }) {
		await this.#db.transaction(async (tx) => {
			const [newUser] = await tx
				.insert(usersTable)
				.values({ username: user.username })
				.returning({ id: usersTable.id });
			await tx.insert(passwordsTable).values({ userId: newUser.id, hash: user.hash.hash });
			return newUser;
		});
	}
}

export default User;
