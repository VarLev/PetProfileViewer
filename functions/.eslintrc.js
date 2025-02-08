module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    quotes: 'off',
    'import/no-unresolved': 0,
    indent: ['error', 2],
    'valid-jsdoc': 'off', // отключаем проверку JSDoc
    'operator-linebreak': 'off', // отключаем требование переноса оператора в конце строки
    'max-len': ['error', { code: 120 }], // увеличиваем ограничение длины строки до 120 символов (или можно 'off')
    // можно добавить и другие изменения по вашему усмотрению 
  },
};
