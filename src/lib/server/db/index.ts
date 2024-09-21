import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';

console.log('database', DATABASE_URL);
const client = postgres(DATABASE_URL);
export const db = drizzle(client);
