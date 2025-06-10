import js from "@eslint/js";
import securityPlugin from "eslint-plugin-security";
import { config as baseConfig } from "./base.js";

export const apiConfig = [
  ...baseConfig,
  js.configs.recommended,
  {
    plugins: {
      security: securityPlugin,
    },
    rules: {
      // TypeScript strict rules for API routes
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: false,
        },
      ],

      // Security rules
      "security/detect-object-injection": "warn",
      "security/detect-possible-timing-attacks": "error",
      "security/detect-non-literal-regexp": "error",
      "security/detect-non-literal-fs-filename": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-unsafe-regex": "error",
      "security/detect-new-buffer": "error",

      // Error handling
      "@typescript-eslint/no-throw-literal": "error",
      "no-return-await": "error",
      "require-await": "error",

      // API-specific rules
      "max-lines-per-function": [
        "error",
        {
          max: 30,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ["error", 5],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
  },
];
