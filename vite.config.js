import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '/',
  server: {
    port: 5173,
    strictPort: true,
    // `npm run cf:dev` serves the Pages Functions on 8788
    proxy: { '/api': 'http://127.0.0.1:8788' }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});