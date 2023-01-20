module.exports = {
  printWidth: 80,
  "editor.formatOnSave": true,
  proseWrap: "always",
  tabWidth: 2,
  requireConfig: false,
  useTabs: false,
  trailingComma: "none",
  semi: true,
  singleQuote: false,
  printWidth: 60,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
};
