import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

if(!process.env.EMAIL || !process.env.PASSWORD || !process.env.URL){
  console.error('Please set the EMAIL, PASSWORD, and URL environment variables in the .env file at the root directory.');  
  process.exit(1); 
};
module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.URL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});