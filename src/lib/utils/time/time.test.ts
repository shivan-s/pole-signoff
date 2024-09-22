import { fromNow, dateStamp } from './time';
import { describe, expect, test } from 'vitest';

describe('time functions', () => {
	test('fromNow should work', () => {
		expect(fromNow(new Date())).toBeTruthy();
	});
	test('dateStamp should work', () => {
		expect(dateStamp(new Date())).toBeTruthy();
	});
});
