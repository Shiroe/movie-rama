const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const { transparent, black, white, stone, gray, red, yellow, amber, emerald } =
  colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    safelist: [
      {
        pattern:
          /(bg|text|border)-(red|yellow|gray|stone|amber)-(50|100|200|300|400|500|600|700|800|900)/,
      },
      {
        pattern: /(border)-(x|y|l|b|t|r)-(0|2|4|8)/,
      },
    ],
    fontSize: {
      sm: ['12px', '18px'],
      base: ['14px', '21px'],
      lg: ['16px', '24px'],
      xl: ['18px', '27px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px', '44px'],
      '4xl': ['52px', '64px'],
    },
    colors: {
      transparent,
      black,
      white,
      stone,
      gray,
      red,
      emerald,
      yellow,
      amber,
    },
    backgroundColor: {
      transparent,
      black,
      white,
      gray,
      red,
      emerald,
      yellow,
      amber,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
