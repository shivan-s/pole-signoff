import type { SelectUser } from '$lib/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Omit<SelectUser, 'hash' | 'salt'>;
		}
		// interface PageData {}
		interface Platform {
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
