import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Split vendor chunk into smaller chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'ui-vendor': ['react-icons', 'sonner', 'framer-motion', 'react-transition-group', 'aos'],
          'form-vendor': ['formik'],
          'query-vendor': ['@tanstack/react-query', 'axios']
        }
      }
    },
    outDir: 'dist',
    chunkSizeWarningLimit: 1000 // Increase from default 500 to 1000 kB
  }
}) 