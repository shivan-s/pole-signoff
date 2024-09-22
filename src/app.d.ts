import type { SelectUser } from '$lib/server/db/schema';
import Database from '$lib/server/db';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database;
			user: SelectUser;
		}
		// interface PageData {}
		interface Platform {
			env: {
				DB: D1Database;
			};
			context: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
