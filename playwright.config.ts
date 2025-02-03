import {defineConfig} from '@playwright/test';
import 'dotenv/config'

const progressReporter = process.env.CI ? 'dot' : 'list';

export default defineConfig({
    tsconfig: './src/test/tsconfig.json', // tsconfig file for loading test files, reporters, etc.
    timeout: 60000, // Timeout is shared between all tests.
    // Concise 'dot' for CI, default 'list' when running locally
    reporter: [
        [progressReporter],
    ],
    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: process.env.BASE_URL,

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',
    },
});
