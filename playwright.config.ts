import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 50000,
  use: {
    trace: 'on',
  },
  reporter: [['list'], ['allure-playwright']],
  testDir: './tests',
};

export default config;