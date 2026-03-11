import tsconfigPaths from "vite-tsconfig-paths";
import {defineConfig} from "vitest/config";

const config = defineConfig({
  /** Test Runner */
  test: {
    environment: "node",
    globals: true,
    passWithNoTests: true,

    // Sources
    includeSource: ["src/**/*.{ts,tsx,js,jsx}"],
    exclude: ["**/node_modules/**", "**/dist/**"],

    // Coverage
    coverage: {
      provider: "istanbul",
      include: ["src/**"],
      exclude: [
        "src/**/*.test.*",
        "src/**/*.spec.*",
        "**/*.d.ts",
        "**/*.astro",
      ],
      reporter: ["text", "html", "lcov"],
    },
  },

  /** Vite Plugins */
  plugins: [tsconfigPaths({projects: ["./tsconfig.json"]})],
});

export default config;
