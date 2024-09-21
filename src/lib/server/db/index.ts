import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

console.log('database', DATABASE_URL);
const client = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(client);
