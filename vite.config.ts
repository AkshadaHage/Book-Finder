import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion', 'react-icons'], // pre-bundle these
  },
  build: {
    rollupOptions: {
      external: [], // ensures nothing is treated as external
    },
  },
});
