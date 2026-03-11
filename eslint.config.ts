import {existsSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import eslintViTest from "@vitest/eslint-plugin";
import {configs as eslintSonarjsConfigs} from "eslint-plugin-sonarjs";
import {defineConfig, globalIgnores} from "eslint/config";
import tseslint from "typescript-eslint";

/** Glob Patterns: Config Files */

export const GLOB_CONFIG_TS = [
  ".*.{ts,tsx,cts,mts}",
  "*.setup.{ts,tsx,cts,mts}",
  "*.config.{ts,tsx,cts,mts}",
  "*.options.{ts,tsx,cts,mts}",
  "*.workspace.{ts,tsx,cts,mts}",
  "**/.*.{ts,tsx,cts,mts}",
  "**/*.setup.{ts,tsx,cts,mts}",
  "**/*.config.{ts,tsx,cts,mts}",
  "**/*.options.{ts,tsx,cts,mts}",
];

export const GLOB_CONFIG_JS = [
  ".*.{js,jsx,cjs,mjs}",
  "*.setup.{js,jsx,cjs,mjs}",
  "*.config.{js,jsx,cjs,mjs}",
  "*.options.{js,jsx,cjs,mjs}",
  "*.workspace.{js,jsx,cjs,mjs}",
  "**/.*.{js,jsx,cjs,mjs}",
  "**/*.setup.{js,jsx,cjs,mjs}",
  "**/*.config.{js,jsx,cjs,mjs}",
  "**/*.options.{js,jsx,cjs,mjs}",
];

/** Glob Patterns: Source Files */

export const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
export const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];

export const GLOB_SRC_JS = ["**/src/**/*.{js,jsx,cjs,mjs}"];
export const GLOB_SRC_TS = ["**/src/**/*.{ts,tsx,cts,mts}"];
export const GLOB_SRC_JS_WITHONLY_JSX = ["**/src/**/*.{jsx}"];
export const GLOB_SRC_TS_WITHONLY_JSX = ["**/src/**/*.{tsx}"];
export const GLOB_SRC_JS_WITHOUT_JSX = ["**/src/**/*.{js,mjs,cjs}"];
export const GLOB_SRC_TS_WITHOUT_JSX = ["**/src/**/*.{ts,mts,cts}"];

/** Glob Patterns: Tests, Scripts, Types, Declarations */

export const GLOB_TEST = [
  "**/*.test-utils.{ts,tsx,cts,mts}",
  "**/*.spec.{ts,tsx,cts,mts}",
  "**/*.test.{ts,tsx,cts,mts}",
  "**/spec.{ts,tsx,cts,mts}",
  "**/test.{ts,tsx,cts,mts}",
];

export const GLOB_SCRIPT = ["scripts/**/*.{ts,cts,mts}"];

export const GLOB_TYPES = ["types/**/*.{ts,tsx,cts,mts}"];

export const GLOB_DECLARATIONS = [
  "*.d.{ts,tsx,cts,mts}",
  "**/*.d.{ts,tsx,cts,mts}",
];

/** Project Root Resolution */

const __filename = fileURLToPath(import.meta.url);
const __dirname = ((): string | undefined => {
  let dir = path.dirname(__filename);
  while (dir) {
    const hasGit = existsSync(path.join(dir, ".git"));
    const hasPkg = existsSync(path.join(dir, "package.json"));
    if (hasGit && hasPkg) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return dir;
    dir = parent;
  }
})();

/** Type-Checked Rule Helpers */

export const enableTypeCheckedRules = {
  ...tseslint.configs.strictTypeCheckedOnly
    .map((x) => x.rules)
    .reduce((a, b) => ({...a, ...b}), {}),
  ...tseslint.configs.stylisticTypeCheckedOnly
    .map((x) => x.rules)
    .reduce((a, b) => ({...a, ...b}), {}),
  "@typescript-eslint/consistent-type-exports": "error" as const,
  "@typescript-eslint/consistent-type-imports": "error" as const,
};

export const disableTypeCheckedRules = Object.fromEntries(
  Object.keys(enableTypeCheckedRules).map((x) => [x, "off" as const]),
);

/** ESLint Configuration */

const config = defineConfig(
  /** Global Ignores */

  globalIgnores([
    // Dependencies and Package Management
    "**/node_modules/**",
    "**/.pnp",
    "**/.pnp.*",
    "**/.yarn/cache/**",
    "**/.yarn/unplugged/**",

    // Build Outputs
    "**/dist/**",
    "**/build/**",
    "**/.output/**",
    "**/out/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/.nitro/**",

    // Framework-Specific Directories
    "**/.astro/**",
    "**/.svelte-kit/**",
    "**/.tanstack/**",
    "**/.cache/**",
    "**/.docusaurus/**",

    // Mobile Applications
    "**/android/**",
    "**/ios/**",

    // Testing and Coverage
    "**/coverage/**",
    "**/*.coverage",
    "**/coverage*.json",
    "**/coverage*.xml",
    "**/.nyc_output/**",
    "**/test-results/**",
    "**/playwright-report/**",
    "**/blob-report/**",
    "**/playwright/.cache/**",

    // Mutation Testing
    "**/stryker-tmp/**",
    "**/reports/**",

    // Cache and Temporary Files
    "**/.moon/cache/**",
    "**/.parcel-cache/**",
    "**/*.tmp",
    "**/*.bak",
    "**/*.old",
    "**/*.log",
    "**/*storybook.log",

    // Auto-Generated Files
    "**/*.gen.*",
    "**/auto-imports.d.ts",
    "**/routeTree.gen.ts",
    "**/worker-configuration.d.ts",
    "**/*.tsbuildinfo",
    "**/next-env.d.ts",
    "**/api.d.ts",

    // Documentation Build Outputs
    "**/storybook-static/**",
    "**/docs/_build/**",

    // Operating System Files
    "**/.DS_Store",
    "**/*.icloud",

    // Miscellaneous Generated Files
    "**/.assetsignore",
  ]),

  /** Base Language Options */

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  /** TypeScript: Strict + Stylistic Type-Checked */

  {
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: [...GLOB_TS],
    rules: {
      ...enableTypeCheckedRules,
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  /** TypeScript & JavaScript: Parser + SonarJS */

  {
    extends: [eslintSonarjsConfigs.recommended],
    files: [...GLOB_JS, ...GLOB_TS],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": "off",

      // SonarJS
      "sonarjs/pseudo-random": "off",
      "sonarjs/no-alphabetical-sort": "off",
      "sonarjs/function-return-type": "off",
      "sonarjs/cognitive-complexity": "off",
      "sonarjs/regex-complexity": "off",
      "sonarjs/anchor-precedence": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/no-invariant-returns": "off",
      "sonarjs/slow-regex": "off",
      "sonarjs/no-hardcoded-passwords": "off",
      "sonarjs/no-unused-vars": "off",
      "sonarjs/todo-tag": "off",
    },
  },

  /** Tests: Vitest Plugin */

  {
    extends: [eslintViTest.configs.recommended],
    files: [...GLOB_TEST],
    rules: {
      // TypeScript
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unsafe-argument": "off",

      // SonarJS
      "sonarjs/no-nested-functions": "off",
      "sonarjs/no-hardcoded-secrets": "off",
      "sonarjs/no-identical-functions": "off",
    },
  },

  /** Scripts: No Type Checking */

  {
    files: GLOB_SCRIPT,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "no-console": "off",
      ...disableTypeCheckedRules,
    },
  },

  /** Config Files: No Type Checking */

  {
    files: [...GLOB_CONFIG_JS, ...GLOB_CONFIG_TS],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      ...disableTypeCheckedRules,
    },
  },

  /** Type Declarations: No Type Checking */

  {
    files: GLOB_TYPES,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      ...disableTypeCheckedRules,
    },
  },
);

export default config;
