import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './migrations',
	dialect: 'turso',
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	},
	verbose: true
});
