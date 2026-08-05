const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
  test: {
    environment: "node",
    globals: true, // optional: lets you use describe/it/expect without imports
    testTimeout: Infinity,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    silent: true, // suppresses console output during tests
  },
});