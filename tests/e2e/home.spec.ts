import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the placeholder page loads without accessibility violations', async ({
  page,
}) => {
  const fontUrls: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'font') {
      fontUrls.push(request.url());
    }
  });

  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Portfolio | Setup');
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toContainText(
    'country. TODO: email address \u00b7 GitHub \u00b7 TODO: LinkedIn URL',
  );
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

  const fontsLoaded = await page.evaluate(async () => {
    await document.fonts.ready;

    return (
      document.fonts.check('400 18px "Archivo Black"') &&
      document.fonts.check('400 18px "DM Sans"') &&
      document.fonts.check('700 18px "DM Sans"')
    );
  });

  expect(fontsLoaded).toBe(true);
  expect(fontUrls.length).toBeGreaterThan(0);
  expect(
    fontUrls.every((url) => new URL(url).origin === new URL(page.url()).origin),
  ).toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test('keyboard users can skip the navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to content' });

  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await expect(skipLink).toHaveCSS('outline-style', 'solid');
  await skipLink.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'GitHub' }),
  ).toBeFocused();
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
