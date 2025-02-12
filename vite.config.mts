import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  root: './src/web/',
  build: {
    outDir: '../../public',
    emptyOutDir: true,
  },
  plugins: [react()],
});
