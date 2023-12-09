import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type Move = { name: string; date: Date | null };
const unMappedMoves: Move[] = [
	{
		name: 'Move One',
		date: new Date()
	},
	{
		name: 'Move Two',
		date: null
	},
	{
		name: 'Move Three',
		date: null
	},
	{
		name: 'Move Four',
		date: null
	},
	{
		name: 'Move Five',
		date: null
	}
];
const moves = new Map<number, Move>();
unMappedMoves.forEach(({ name, date }, idx) => moves.set(idx, { name, date }));

export const load: PageServerLoad = () => {
	const complete = [...moves].filter(([, v]) => v.date === null).length === 0;
	return {
		moves,
		complete,
		pageTitle: 'Level 1'
	};
};

export const actions: Actions = {
	signoff: async ({ request }) => {
		const formData = await request.formData();
		const moveId = formData.get('id');
		if (typeof moveId !== 'string') {
			console.log('moveId is not valid type: ', moveId);
			throw error(400, 'Bad data in form');
		}
		const parsedMoveId = parseInt(moveId);
		if (isNaN(parsedMoveId)) {
			console.log('moveId is not an integer');
			throw error(400, 'Bad data in form');
		}

		const move = moves.get(parsedMoveId);
		if (!move) {
			console.log('moveId does not exist');
			throw error(400, 'Bad data in form');
		}
		move.date = new Date();
		// Simulates database call
		await new Promise((r) => setTimeout(r, 2000));
		moves.set(parsedMoveId, { ...move });
	},
	reset: async () => {
		moves.forEach((m) => (m.date = null));
	}
};
