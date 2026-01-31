import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          utils: ['axios', 'date-fns', 'lucide-react']
        }
      }
    }
  },
  server: {
    host: true, // Needed for Render/Docker environments
    port: 5173
  }
})
