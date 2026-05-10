import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["exercises/**", "templates/**", "solutions/**", "dist/**"],
    globals: true
  }
});
