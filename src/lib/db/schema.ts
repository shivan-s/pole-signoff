import { text, integer, pgTable, boolean, serial, timestamp, uuid } from 'drizzle-orm/pg-core';

export const emailsTable = pgTable('emails', {
	id: serial('id').primaryKey(),
	email: text('email').unique().notNull(),
	isValidated: boolean('is_validated').default(false),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull()
});

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	name: text('name'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	lastLogin: timestamp('last_login', { withTimezone: true }),
	deletedAt: timestamp('deleted_at', { withTimezone: true }),
	verfiedAt: timestamp('verfied_at', { withTimezone: true }),
	isAdmin: boolean('admin').default(false).notNull(),
	levelCanSignoff: integer('level_can_signoff'),
	canCreateMoves: boolean('can_signoff').default(false).notNull()
});
export type User = typeof usersTable.$inferSelect;

export const passwordsTable = pgTable('passwords', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull(),
	hash: text('hash').notNull()
});

export const filesTable = pgTable('files', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	uuid: uuid('uuid').unique(),
	filename: text('filename').notNull(),
	fileType: text('file_type').notNull()
});

export const movesTable = pgTable('moves', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	level: integer('level').notNull(),
	rank: integer('rank'),
	deletedAt: timestamp('deleted_at', { withTimezone: true })
});

export const filesMovesTable = pgTable('user_moves', {
	id: serial('id').primaryKey(),
	moveId: integer('move_id')
		.references(() => movesTable.id)
		.notNull(),
	fileId: integer('file_id')
		.references(() => filesTable.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull()
});

export const userMovesTable = pgTable('user_moves', {
	id: serial('id').primaryKey(),
	moveId: integer('move_id')
		.references(() => movesTable.id)
		.notNull(),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull(),
	awarderId: integer('awarder_id')
		.references(() => usersTable.id)
		.notNull(),
	achievedAt: timestamp('achieved_at', { withTimezone: true }).defaultNow().notNull()
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
