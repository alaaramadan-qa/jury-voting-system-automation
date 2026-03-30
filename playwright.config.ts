import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './tests',
        fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 2 : 4,
        reporter: [
          ['html', { outputFolder: 'playwright-report', open: 'never' }],
          ['list'],
        ],
        use: {
    baseURL: 'https://admin.stg.alweb4tech.com',
          trace: 'on-first-retry',
          screenshot: 'only-on-failure',
          video: 'on-first-retry',
          actionTimeout: 15000,
          navigationTimeout: 30000,
      },
        projects: [
      {
            name: 'chromium',
                    use: { ...devices['Desktop Chrome'] },
    },
{
      name: 'firefox',
              use: { ...devices['Desktop Firefox'] },
},
{
      name: 'webkit',
              use: { ...devices['Desktop Safari'] },
},
  ],
    });
