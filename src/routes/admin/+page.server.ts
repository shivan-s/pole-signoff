import type { Actions, PageServerLoad } from './$types';
import { moves } from '$lib/db/schema';
import { asc, eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import { detectDuplicate } from '$lib/utils';

export const load: PageServerLoad = async ({ locals, url }) => {
	console.log('TODO: Admin permission check');
	const sp = url.searchParams;
	const updateMove = sp.get('updateMove');
	const allMoves = await locals.db
		.select({
			ids: sql<string>`STRING_AGG(${moves.id}, ';')`,
			names: sql<string>`STRING_AGG(${moves.name}, ';')`,
			descriptions: sql<string>`STRING_AGG(COALESCE(${moves.description}, ''), '|')`,
			deletedAts: sql<string>`STRING_AGG(COALESCE(${moves.deletedAt}, ''), ';')`,
			level: moves.level
		})
		.from(moves)
		.orderBy(asc(moves.level))
		.groupBy(moves.level);

	const movesByLevel = allMoves.map((m) => ({
		level: m.level,
		ids: m.ids.split(';').map((i) => parseInt(i)),
		moves: m.names.split(';'),
		descriptions: m.descriptions.split('|').map((d) => (d === '' ? null : d)),
		deletedAt: m.deletedAts.split(';').map((d) => (Date.parse(d) ? new Date(Date.parse(d)) : null))
	}));
	return {
		formId: uuid(),
		updateMove: updateMove && parseInt(updateMove),
		movesByLevel,
		pageTitle: 'Admin'
	};
};

export const actions: Actions = {
	createMove: async ({ request, locals }) => {
		console.log('TODO: Admin permission check');
		const formData = await request.formData();
		detectDuplicate({ fd: formData, action: 'createMove' });
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
			.insert(moves)
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
		await locals.db
			.update(moves)
			.set({
				name: name.trim(),
				level: parseInt(level),
				description: description?.trim()
			})
			.where(eq(moves.id, parseInt(id)));
		return {
			name,
			description,
			level
		};
	},
	deactivateMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await locals.db
			.update(moves)
			.set({
				deletedAt: new Date().toISOString()
			})
			.where(eq(moves.id, parseInt(id)));
	},
	activateMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await locals.db
			.update(moves)
			.set({
				deletedAt: null
			})
			.where(eq(moves.id, parseInt(id)));
	},
	promoteMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		const movesLevel = locals.db
			.select()
			.from(moves)
			.where((moves, { eq }) => eq(moves.level));
		await locals.db
			.update(moves)
			.set({
				deletedAt: null
			})
			.where(eq(moves.id, parseInt(id)));
	},
	deleteMove: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || isNaN(parseInt(id))) {
			console.log("Error 'id': ", id);
			error(400, 'Invalid data in form');
		}
		await locals.db.delete(moves).where(eq(moves.id, parseInt(id)));
	}
};
