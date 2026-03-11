import {type Config} from "prettier";

const config: Config = {
  /** Formatting */
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  bracketSameLine: true,
  bracketSpacing: false,

  /** Plugins */
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  /** Import Sorting */
  importOrderParserPlugins: ["typescript"],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
