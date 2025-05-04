import { test, expect } from '@playwright/test';
// import { SearchPage } from './ObjectModel';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('div'); // Needed to allow page load on webkit
  const title = await page.title();
  const expectedTitle = 'Football Stats';
  expect(title).toBe(expectedTitle);
});
