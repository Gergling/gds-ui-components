import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import * as path from 'path';

const packagePath = __dirname;
const tsconfigLibPath = path.join(packagePath, 'tsconfig.lib.json');

console.log('tsconfigLibPath', tsconfigLibPath)
export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/ui-components',
  plugins: [
    react(), 
    nxViteTsPaths(), 
    dts({
      entryRoot: 'src',
      tsconfigPath: tsconfigLibPath,
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ui-components',
      fileName: (format) => `index.${format === 'es' ? 'es.js' : 'js'}`,
      formats: ['es', 'cjs'] as LibraryFormats[],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into your library.
      external: [
        '@emotion/react',
        '@emotion/styled',
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
    },
    reportCompressedSize: true,
    target: 'esnext',
  },
  test: {
    name: 'ui-components',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reporter: ['json-summary'],
      provider: 'v8' as const,
    },
  },
});
