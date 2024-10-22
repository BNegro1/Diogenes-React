import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Resolvemos el error de TypeScript añadiendo la importación de Node
import type { UserConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ionic': ['@ionic/react', '@ionic/react-router'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-utils': ['xlsx', 'zustand']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['@ionic/react', '@ionic/react-router']
  }
}) as UserConfig;