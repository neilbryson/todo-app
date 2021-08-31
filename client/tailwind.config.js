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
      sans: ['Atkinson Hyperlegible', 'sans-serif'],
    },
    extend: {
      colors: {
        translucent: '#e5e7eb87'
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      fontWeight: ['hover'],
      margin: ['first', 'last'],
    },
  },
  plugins: [],
};
