import { formatDistanceToNow, isToday } from 'date-fns';

export function fromNow(date: Date | string | number): string {
	const distance = isToday(date) ? 'today!' : formatDistanceToNow(date, { addSuffix: true });
	return distance;
}

export function dateStamp(date: Date | string | number) {
	const d = new Date(date);
	return d.toLocaleDateString([], {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
