// postcss.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        Spartan: ['"League Spartan"', 'sans-serif'],
      }
    },
  },
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};