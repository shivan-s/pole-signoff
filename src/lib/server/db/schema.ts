import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const emailsTable = sqliteTable('emails', {
	id: integer('id').primaryKey(),
	email: text('email').unique().notNull(),
	validatedAt: text('validated_at'),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull()
});

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	stagehandle: text('stagehandle').notNull().unique(),
	name: text('name'),
	createdAt: text('created_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	lastLogin: text('last_login'),
	deletedAt: text('deleted_at'),
	isAdmin: integer('admin', { mode: 'boolean' }).default(false).notNull(),
	isPrivate: integer('private', { mode: 'boolean' }).default(true).notNull(),
	levelCanSignoff: integer('level_can_signoff'),
	canCreateMoves: integer('can_signoff', { mode: 'boolean' }).default(false).notNull()
});
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export const passwordsTable = sqliteTable('passwords', {
	id: integer('id').primaryKey(),
	createdAt: text('created_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull(),
	hash: text('hash').notNull()
});
export type SelectPassword = typeof passwordsTable.$inferSelect;
export type InsertPassword = typeof passwordsTable.$inferInsert;

export const filesTable = sqliteTable('files', {
	id: integer('id').primaryKey(),
	createdAt: text('created_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	uuid: text('uuid').unique(),
	filename: text('filename').notNull(),
	fileType: text('file_type').notNull()
});
export type SelectCustomFile = typeof filesTable.$inferSelect;
export type InsertCustomFile = typeof filesTable.$inferInsert;

export const movesTable = sqliteTable('moves', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	level: integer('level').notNull(),
	rank: integer('rank'),
	deletedAt: text('deleted_at')
});
export type SelectMove = typeof movesTable.$inferSelect;
export type InsertMove = typeof movesTable.$inferInsert;

export const filesMovesTable = sqliteTable('user_moves', {
	id: integer('id').primaryKey(),
	moveId: integer('move_id')
		.references(() => movesTable.id)
		.notNull(),
	fileId: integer('file_id')
		.references(() => filesTable.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull()
});
export type SelectFileMove = typeof filesMovesTable.$inferSelect;
export type InsertFileMove = typeof filesMovesTable.$inferInsert;

export const userMovesTable = sqliteTable('user_moves', {
	id: integer('id').primaryKey(),
	moveId: integer('move_id')
		.references(() => movesTable.id)
		.notNull(),
	userId: integer('user_id')
		.references(() => usersTable.id)
		.notNull(),
	awarderId: integer('awarder_id')
		.references(() => usersTable.id)
		.notNull(),
	achievedAt: text('achieved_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});
export type SelectUserMove = typeof userMovesTable.$inferSelect;
export type InsertUserMove = typeof userMovesTable.$inferInsert;

export const inviteCodesTable = sqliteTable('invite_codes', {
	uuid: text('uuid').primaryKey(),
	senderId: integer('sender_id')
		.references(() => usersTable.id)
		.notNull(),
	receiverId: integer('receiver_id').references(() => usersTable.id)
});
export type SelectInviteCode = typeof inviteCodesTable.$inferSelect;
export type InsertInviteCode = typeof inviteCodesTable.$inferInsert;
