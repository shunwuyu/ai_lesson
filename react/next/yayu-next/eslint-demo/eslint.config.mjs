import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["eslint.config.mjs"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      // 0=off 1=warn 2=error
      "no-var": 2,
      "no-console": 1,             // console 给出警告
      "indent": ["error", 2],     // 缩进必须2空格
      "quotes": ["error", "double"], // 单引号
      "semi": ["error", "always"] // 语句末尾分号
    },
  },
  pluginReact.configs.flat.recommended,
]);
