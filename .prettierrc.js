module.exports = {
  tailwindConfig: './tailwind.config.js',
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss', // MUST alsways come last
  ],
  pluginSearchDirs: false, // needed for prettier-tailwindcss plugin to load correctly
};
