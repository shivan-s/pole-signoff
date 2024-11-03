import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	const WAVE = '👋';
	await expect(
		page.getByRole('heading', { name: `${WAVE} Welcome to Pole Academy` })
	).toBeVisible();
});
