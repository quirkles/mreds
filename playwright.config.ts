import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // The directory to output the test results
  testDir: './tests',

  // Use a timeout of 30 seconds for each test
  timeout: 30000,

  // Global setup and teardown can be defined here
  //   globalSetup: './global-setup.ts', // Optional
  //   globalTeardown: './global-teardown.ts', // Optional

  // Number of retries for failed tests
  retries: 1,

  // Reporters for test results
  reporter: [
    ['dot'], // Output results in a dot format
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // Generates an HTML report
  ],

  // The use of base URL for your tests
  use: {
    baseURL: 'https://example.com', // Set your base URL here
    headless: true, // Run in headless mode by default
    screenshot: 'only-on-failure', // Take screenshots only on failures
    video: 'retain-on-failure', // Record video only on failure
  },

  // Configure test timeout for each test
  expect: {
    timeout: 5000, // Expect timeout for assertions
  },

  // Projects can be defined to test across different browsers/devices
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] }, // Using a specific device configuration
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
