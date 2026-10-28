import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor_three: ['three'],
          vendor_gsap: ['gsap', '@gsap/react'],
          vendor_react: ['react', 'react-dom'],
        },
      },
    },
  },
});
