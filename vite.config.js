import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/colorbox',
  plugins: [
    react(), 
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      reporter: ['text'],
      thresholds: {
        functions: 80,
        branches: 80,
        statements: 80
      },
      exclude: [
        '.eslintrc',
        '*config*',
        'dist/**',
        'public**/**',
        '**/node_modules/**',
        '**/dist/**',
        'scripts/**',
        'src/index.jsx',
        'src/serviceWorker.js'
      ]
    }
  }
});
