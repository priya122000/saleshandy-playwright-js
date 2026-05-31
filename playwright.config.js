const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://my.saleshandy.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/
    },
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup'],
      testIgnore: /.*signup\.spec\.js/
    },
    {
      name: 'chromium-public',
      use: {
        ...devices['Desktop Chrome']
      },
      testMatch: /.*signup\.spec\.js/
    }
  ]
});
