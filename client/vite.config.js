import checker from 'vite-plugin-checker';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [
    checker({ typescript: true }),
  ],
  server: {
    open: true,
  },
};

export default config;
