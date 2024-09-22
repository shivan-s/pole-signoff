import { createClient } from '@libsql/client/web';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client);
