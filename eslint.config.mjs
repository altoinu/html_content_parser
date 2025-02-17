import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,cjs,mjs}"],
    ignores: ["node_modules", "build", "*.css"],
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
