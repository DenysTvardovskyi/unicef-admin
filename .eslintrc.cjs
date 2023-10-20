module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [ "dist", ".eslintrc.cjs" ],
  parser: "@typescript-eslint/parser",
  plugins: [ "react-refresh" ],
  rules: {
    "react/react-in-jsx-scope": [ "off" ],
    "react/jsx-uses-react": [ "off" ],
    "react/jsx-props-no-spreading": [ "off" ],
    "react/no-unescaped-entities": [ "off" ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
