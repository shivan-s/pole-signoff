import { writable, type Writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

type Toast = {
	id?: string;
	directive?: 'primary' | 'danger' | 'success' | 'warning';
	duration?: number;
	message: string;
};

export const toasts: Writable<Toast[]> = writable([]);

export function addToast(toast: Toast) {
	const id = uuid();
	toasts.update((value) => [...value, { ...toast, id }]);
	setTimeout(
		() => toasts.update((value) => value.filter((v) => v.id !== id)),
		toast.duration || 2000
	);
}

export function dismissToast(id: string) {
	toasts.update((value) => value.filter((v) => v.id !== id));
}
