import { test, expect } from '@playwright/test';

test('User happy path', async ({ page }) => {
  await page.goto('');

  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('link', { name: 'Powder Canister Powder' }).click();

  await expect(page.getByRole('heading', { name: 'Powder Canister' })).toBeVisible();

  await page.getByRole('link', { name: 'Back' }).click();

  await expect(page.getByRole('heading', { name: 'touché choice' })).toBeVisible();
});
