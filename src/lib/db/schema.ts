import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const emails = sqliteTable('emails', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull()
});

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull().unique(),
	name: text('name').default('').notNull(),
	createdAt: text('created_at')
		.default(sql`TIMESTAMP`)
		.notNull()
});

export const moves = sqliteTable('moves', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	level: integer('level').notNull(),
	rank: integer('rank'),
	deletedAt: text('deleted_at')
});

export const userMoves = sqliteTable('user_moves', {
	id: integer('id').primaryKey(),
	moveId: integer('move_id')
		.references(() => moves.id)
		.notNull(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	achievedAt: text('achieved_at')
		.default(sql`TIMESTAMP`)
		.notNull()
});
