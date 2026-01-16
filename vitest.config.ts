import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true, // optional: lets you use describe/it/expect without imports
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});