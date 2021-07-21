module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '800px',
      md: '1200px',
      lg: '1600px',
      xl: '1920px',
      '2xl': '2400px',
    },
    fontFamily: {
      sans: ['Comfortaa', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      margin: ['last'],
    },
  },
  plugins: [],
};
