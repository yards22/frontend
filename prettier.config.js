module.exports = {
    trailingComma: 'all',
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    printWidth: 60,
    plugins: [require('prettier-plugin-tailwindcss')],
    tailwindConfig: './tailwind.config.js',
  };