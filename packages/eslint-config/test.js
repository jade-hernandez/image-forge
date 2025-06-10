import js from "@eslint/js";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import { config as baseConfig } from "./base.js";

export const testConfig = [
  ...baseConfig,
  js.configs.recommended,
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    plugins: {
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      // Testing Library Rules
      "testing-library/await-async-queries": "error",
      "testing-library/await-async-utils": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-container": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-dom-import": ["error", "react"],
      "testing-library/no-node-access": "error",
      "testing-library/no-promise-in-fire-event": "error",
      "testing-library/no-render-in-setup": "error",
      "testing-library/no-unnecessary-act": "error",
      "testing-library/no-wait-for-empty-callback": "error",
      "testing-library/prefer-explicit-assert": "error",
      "testing-library/prefer-presence-queries": "error",
      "testing-library/prefer-screen-queries": "error",
      "testing-library/prefer-user-event": "error",
      "testing-library/render-result-naming-convention": "error",

      // Jest DOM Rules
      "jest-dom/prefer-checked": "error",
      "jest-dom/prefer-empty": "error",
      "jest-dom/prefer-enabled-disabled": "error",
      "jest-dom/prefer-focus": "error",
      "jest-dom/prefer-in-document": "error",
      "jest-dom/prefer-required": "error",
      "jest-dom/prefer-to-have-attribute": "error",
      "jest-dom/prefer-to-have-class": "error",
      "jest-dom/prefer-to-have-style": "error",
      "jest-dom/prefer-to-have-text-content": "error",
      "jest-dom/prefer-to-have-value": "error",

      // Overrides for test files
      "max-lines-per-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "max-nested-callbacks": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
    settings: {
      "testing-library/custom-queries": ["findByTestId", "queryByTestId"],
      "testing-library/custom-renders": ["renderWithProviders"],
    },
  },
];
