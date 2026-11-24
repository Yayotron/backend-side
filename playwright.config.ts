import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: Boolean(process.env['CI']),
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4325',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4325',
    url: 'http://127.0.0.1:4325',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
