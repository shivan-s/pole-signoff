import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

console.log('database', DATABASE_URL);
const client = new pg.Client({ connectionString: DATABASE_URL });
client.connect();
export const db = drizzle(client);
