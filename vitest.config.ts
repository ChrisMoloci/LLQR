import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true, // optional: lets you use describe/it/expect without imports
    testTimeout: Infinity,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    silent: true, // suppresses console output during tests
  },
});