import { formatDistanceToNow } from 'date-fns';

export function fromNow(date: Date) {
	return formatDistanceToNow(date, { addSuffix: true });
}
