type Move = { name: string; date: Date | null; level_id: number };
type Level = { level: number };

const unmappedLevels: Level[] = [
	{ level: 1 },
	{ level: 2 },
	{ level: 3 },
	{ level: 4 },
	{ level: 5 }
];
const levels = new Map<number, Level>();
unmappedLevels.forEach(({ level }, idx) => levels.set(idx, { level }));

const unmappedMoves: Move[] = [
	{
		name: 'Move One',
		date: new Date(),
		level_id: 1
	},
	{
		name: 'Move Two',
		date: null,
		level_id: 1
	},
	{
		name: 'Move Three',
		date: null,
		level_id: 2
	},
	{
		name: 'Move Four',
		date: null,
		level_id: 2
	},
	{
		name: 'Move Five',
		date: null,
		level_id: 3
	},
	{
		name: 'Move Six',
		date: null,
		level_id: 3
	},
	{
		name: 'Move Seven',
		date: null,
		level_id: 4
	},
	{
		name: 'Move Eight',
		date: null,
		level_id: 4
	}
];
const moves = new Map<number, Move>();
unmappedMoves.forEach(({ name, date, level_id }, idx) => moves.set(idx, { name, date, level_id }));

export function getMovesByLevel(level: number): Map<number, Move> {
	const filteredMoves = new Map([...moves].filter(([, v]) => v.level_id === level));
	return filteredMoves;
}

export function resetMovesByLevel(level: number): void {
	moves.forEach((m) => {
		if (m.level_id === level) {
			m.date = null;
		}
	});
}

export function getLevels(): Map<number, Level> {
	return levels;
}
