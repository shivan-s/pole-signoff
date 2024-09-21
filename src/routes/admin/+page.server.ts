import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { movesTable } from '$lib/server/db/schema';
import { asc, eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	console.log('TODO: Admin permission check');
	const sp = url.searchParams;
	const updateMove = sp.get('updateMove');
	const allMoves = await db
		.select({
			ids: sql<string>`STRING_AGG(${movesTable.id}, ';')`,
			names: sql<string>`STRING_AGG(${movesTable.name}, ';')`,
			descriptions: sql<string>`STRING_AGG(COALESCE(${movesTable.description}, ''), '|')`,
			deletedAts: sql<string>`STRING_AGG(COALESCE(${movesTable.deletedAt}, ''), ';')`,
			level: movesTable.level
		})
		.from(movesTable)
		.orderBy(asc(movesTable.level))
		.groupBy(movesTable.level);

	const movesByLevel = allMoves.map((m) => ({
		level: m.level,
		ids: m.ids.split(';').map((i) => parseInt(i)),
		moves: m.names.split(';'),
		descriptions: m.descriptions.split('|').map((d) => (d === '' ? null : d)),
		deletedAt: m.deletedAts.split(';').map((d) => (Date.parse(d) ? new Date(Date.parse(d)) : null))
	}));
	return {
		updateMove: updateMove && parseInt(updateMove),
		movesByLevel,
		pageTitle: 'Admin'
	};
};

export const actions: Actions = {
	createMove: async ({ request, locals }) => {
		console.log('TODO: Admin permission check');
		const formData = await request.formData();
		const name = formData.get('name');
		if (typeof name !== 'string') {
			console.log("Error 'name': ", name);
			error(400, 'Invalid data in form');
		}
		if (name.length < 1 || name.length > 127) {
			console.log("Error 'name' length: ", name.length);
			error(400, 'Invalid name length');
		}
		const description = formData.get('description');
		if (description instanceof File) {
			console.log("Error 'description': ", description);
			error(400, 'Invalid data in form');
		}
		const level = formData.get('level');
		if (typeof level !== 'string' || isNaN(parseInt(level))) {
			console.log("Error 'level': ", level);
			error(400, 'Invalid data in form');
		}
		await locals.db
			.insert(movesTable)
			.values({ name: name.trim(), level: parseInt(level), description: description?.trim() });
		return {
			name,
			description,
			level
		};
	},
	updateMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		const name = formData.get('name');
		if (typeof name !== 'string') {
			console.log("Error 'name': ", name);
			error(400, 'Invalid data in form');
		}
		if (name.length < 1 || name.length > 127) {
			console.log("Error 'name' length: ", name.length);
			error(400, 'Invalid name length');
		}
		const description = formData.get('description');
		if (description instanceof File) {
			console.log("Error 'description': ", description);
			error(400, 'Invalid data in form');
		}
		const level = formData.get('level');
		if (typeof level !== 'string' || isNaN(parseInt(level))) {
			console.log("Error 'level': ", level);
			error(400, 'Invalid data in form');
		}
		await db
			.update(movesTable)
			.set({
				name: name.trim(),
				level: parseInt(level),
				description: description?.trim()
			})
			.where(eq(movesTable.id, parseInt(id)));
		return {
			name,
			description,
			level
		};
	},
	deactivateMove: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await db
			.update(movesTable)
			.set({
				deletedAt: new Date()
			})
			.where(eq(movesTable.id, parseInt(id)));
	},
	activateMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await db
			.update(movesTable)
			.set({
				deletedAt: null
			})
			.where(eq(movesTable.id, parseInt(id)));
	},
	promoteMove: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		const movesLevel = db
			.select()
			.from(movesTable)
			.where((moves, { eq }) => eq(moves.level));
		await db
			.update(movesTable)
			.set({
				deletedAt: null
			})
			.where(eq(movesTable.id, parseInt(id)));
	},
	deleteMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await db.delete(movesTable).where(eq(movesTable.id, parseInt(id)));
	}
};
