import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the placeholder page loads without accessibility violations', async ({
  page,
}) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Portfolio | Setup');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(
    page
      .getByRole('main')
      .getByRole('heading', { name: 'Portfolio', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('TODO: Add the approved portfolio content.'),
  ).toBeVisible();
  await expect(page.locator('script')).toHaveCount(0);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test.describe('without browser JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the placeholder content remains visible', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('main').getByRole('heading', {
        name: 'Portfolio',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText('TODO: Add the approved portfolio content.'),
    ).toBeVisible();
  });
});
