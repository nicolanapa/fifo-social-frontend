import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginPromise from "eslint-plugin-promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ["**/node_modules"],
	},
	...compat.extends("eslint:recommended", "plugin:react/recommended", "prettier"),
	{
		files: ["**/*.{js,jsx,mjs}"],
		languageOptions: {
			globals: {
				...globals.browser,
			},

			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react: reactPlugin,
			promise: pluginPromise,
		},
		rules: {
			indent: ["error", 4],
			"linebreak-style": ["error", "windows"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"react/react-in-jsx-scope": "off",
			"react/jsx-key": "error",
		},
	},
	eslintConfigPrettier,
	reactRefresh.configs.recommended,
	pluginPromise.configs["flat/recommended"],
	js.configs.recommended,
];
