import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the component preview renders all variants without accessibility violations', async ({
  page,
}) => {
  const response = await page.goto('/dev/components');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Components | Portfolio');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex',
  );
  await expect(page.locator('script')).toHaveCount(0);

  const posters = page.getByRole('region', { name: 'Poster samples' });
  await expect(posters.getByRole('link')).toHaveCount(3);
  await expect(
    posters.getByRole('link', { name: 'TODO: Gateway', exact: true }),
  ).toHaveAccessibleDescription(/TODO: Add the approved gateway summary/);
  await expect(posters.getByText('Prototype', { exact: true })).toBeVisible();
  await expect(
    posters.getByText('Early design', { exact: true }),
  ).toBeVisible();
  await expect(posters.getByText('Latest note', { exact: true })).toBeVisible();
  await expect(page.getByText('Researching', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Refining', { exact: true })).toHaveCount(2);

  const milestones = page.getByRole('list', {
    name: 'Milestones',
    exact: true,
  });
  for (const status of ['Done', 'In progress', 'Next']) {
    await expect(milestones.getByText(status, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole('term')).toHaveCount(2);
  await expect(
    page.getByRole('table', { name: 'TODO: Table content' }),
  ).toBeVisible();
  await expect(page.getByRole('blockquote')).toContainText('TODO:');
  await expect(page.getByRole('list', { name: 'Diagram legend' })).toHaveCount(
    3,
  );
  await expect(
    page.getByRole('img', { name: /Illustrative latency budget/ }),
  ).toHaveAccessibleName(/Parse: 0.5 ms; Validate: 0.5 ms/);

  const structure = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(
      (element) => element.id,
    );
    const diagrams = [...document.querySelectorAll('svg[role="img"]')];

    return {
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      nodeCounts: diagrams.map(
        (svg) => svg.querySelectorAll('rect[data-node]').length,
      ),
      edgeCounts: diagrams.map(
        (svg) => svg.querySelectorAll('path[data-from]').length,
      ),
      markersExist: [...document.querySelectorAll('path[marker-end]')].every(
        (edge) => {
          const marker = edge
            .getAttribute('marker-end')
            ?.match(/^url\(#(.+)\)$/)?.[1];
          return (
            marker !== undefined && document.getElementById(marker) !== null
          );
        },
      ),
      overflows:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    };
  });

  expect(structure).toEqual({
    duplicateIds: [],
    nodeCounts: [8, 8, 8],
    edgeCounts: [7, 7, 7],
    markersExist: true,
    overflows: false,
  });

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('poster links have visible focus and a working destination', async ({
  page,
}) => {
  await page.goto('/dev/components');
  await page.keyboard.press('Tab');

  const primary = page.getByRole('link', {
    name: 'TODO: Gateway',
    exact: true,
  });
  await primary.focus();
  await expect(primary).toBeFocused();
  await expect(primary).toHaveCSS('outline-style', 'solid');
  await expect(primary).toHaveCSS('outline-color', 'rgb(242, 201, 76)');
  await primary.press('Enter');
  await expect(page).toHaveURL(/#sample-details$/);
  await expect(
    page.getByRole('heading', { name: 'Project details', exact: true }),
  ).toBeInViewport();

  const accent = page.getByRole('link', { name: 'TODO: Project', exact: true });
  await accent.focus();
  await expect(accent).toHaveCSS('outline-color', 'rgb(23, 86, 55)');
  await page.goto('/dev/components');
  await page
    .locator('.poster')
    .first()
    .click({ position: { x: 30, y: 30 } });
  await expect(page).toHaveURL(/#sample-details$/);
  await page.getByRole('link', { name: /Sample case study:/ }).click();
  await expect(page).toHaveURL(/#sample-details$/);
});

test('posters keep their content inside the frame at narrow and breakpoint widths', async ({
  page,
}) => {
  for (const width of [360, 900, 901]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/dev/components');
    await page.evaluate(() => document.fonts.ready);

    const clippedPosters = await page
      .locator('.poster')
      .evaluateAll((posters) =>
        posters
          .filter((poster) => poster.scrollHeight > poster.clientHeight + 1)
          .map((poster) => poster.querySelector('h3')?.textContent),
      );

    expect(clippedPosters, `Clipped poster content at ${width}px`).toEqual([]);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      ),
      `Horizontal overflow at ${width}px`,
    ).toBe(false);
  }
});

test.describe('without browser JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the components and diagrams remain available', async ({ page }) => {
    await page.goto('/dev/components');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('img', { name: /Illustrative.*gateway/ }),
    ).toHaveCount(3);
    await expect(
      page.getByRole('img', { name: /Illustrative latency budget/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('list', { name: 'Milestones', exact: true }),
    ).toBeVisible();
  });
});
