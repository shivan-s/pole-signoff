import { error } from '@sveltejs/kit';

const cache = new Map<string, string>();

export function detectDuplicate(params: { fd: FormData; action: string }) {
	const formId = params.fd.get('formId');
	if (typeof formId !== 'string' || formId === null) {
		error(400, 'Invalid data in form');
	}
	if (cache.has(formId)) {
		error(409, 'Duplication submission detected');
	}
	cache.set(formId, params.action);
}
