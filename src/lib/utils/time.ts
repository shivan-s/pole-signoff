import { formatDistanceToNow, isToday } from 'date-fns';

export function fromNow(date: Date): string {
	const distance = isToday(date) ? 'today!' : formatDistanceToNow(date, { addSuffix: true });
	return `Achieved ${distance}`;
}

export function dateStamp(date: Date) {
	return date.toLocaleDateString([], {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
