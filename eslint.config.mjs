// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });
const converted = compat.extends("next/core-web-vitals");

// Strip parser functions so Vercel can serialize
const sanitized = converted.map((entry) => {
  if (entry.languageOptions?.parser) {
    const { parser, ...rest } = entry.languageOptions;
    return { ...entry, languageOptions: rest };
  }
  return entry;
});

export default [
  { ignores: ["**/.next/**", "**/node_modules/**"] },
  ...sanitized,
];
