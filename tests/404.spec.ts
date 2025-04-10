import { test, expect } from '@playwright/test';

test('Not found path', async ({ page }) => {
  await page.goto('/dsds');

  await expect(page.locator('h1')).toContainText('404');
  await expect(page.locator('#root')).toContainText('Ooops page not found');
  await page.getByRole('link', { name: 'To main page' }).click();

  await expect(page.getByRole('heading', { name: 'touché choice' })).toBeVisible();
});
