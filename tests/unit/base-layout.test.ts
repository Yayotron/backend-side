import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it } from 'vitest';

import BaseLayout from '../../src/layouts/BaseLayout.astro';

it('renders page metadata and a canonical URL without query parameters', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(BaseLayout, {
    props: {
      title: 'Portfolio | Setup',
      description: 'TODO: Add approved content.',
    },
    request: new Request('https://portfolio.example.test/preview/?draft=true'),
    slots: {
      default: '<h1>Portfolio</h1>',
    },
  });

  expect(html).toContain('<title>Portfolio | Setup</title>');
  expect(html).toContain(
    '<meta name="description" content="TODO: Add approved content.">',
  );
  expect(html).toContain(
    '<link rel="canonical" href="https://portfolio.example.test/preview/">',
  );
  expect(html).toContain('<h1>Portfolio</h1>');
  expect(html).not.toContain('<script');
});
