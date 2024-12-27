import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    define: {
      [isProd ? '_global' : 'global']: {},
    },
    root: 'src',
    build: {
      base: isProd ? '/portfolio/' : './',
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
      cssCodeSplit: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html']), envCompatible()],
    optimizeDeps: {
      entries: [],
    },
  };
});
