import { type DrizzleD1Database } from 'drizzle-orm/d1';
import User from './users';

/**
 * Database wrapper
 */
class Database implements Database {
	raw: DrizzleD1Database;
	user: User;
	constructor(db: DrizzleD1Database) {
		this.raw = db;
		this.user = new User(this.raw);
	}
}

export default Database;
