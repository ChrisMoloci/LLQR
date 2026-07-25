import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    environment: "node",
    globals: true, // optional: lets you use describe/it/expect without imports
    testTimeout: Infinity,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    silent: true, // suppresses console output during tests
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        { browser: "chromium"}
      ],
    },
  },
})
