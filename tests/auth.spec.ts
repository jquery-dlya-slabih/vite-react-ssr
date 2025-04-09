import { test, expect } from '@playwright/test';

test('Auth', async ({ page }) => {
  await page.goto('');

  await page.getByTestId('login').click();
  await page.getByRole('textbox', { name: 'username' }).fill('avat');
  await page.getByRole('textbox', { name: 'username' }).press('Tab');
  await page.getByRole('textbox', { name: 'password' }).fill('avatpass');
  await page.getByRole('textbox', { name: 'password' }).press('Tab');
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  await expect(page.locator('#root')).toContainText('Ava');
  await expect(page.getByRole('img', { name: 'user avatar' })).toBeVisible();
});
