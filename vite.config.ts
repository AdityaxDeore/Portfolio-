import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Pre-bundle router deps so Vite never serves a stale optimized chunk (504 blank page).
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router',
      'react-router-dom',
    ],
  },
  server: {
    port: 5173,
    // Fail loudly if an old dev server is still bound to 5173 (prevents stale 504 blank pages).
    strictPort: true,
    hmr: {
      overlay: true,
    },
  },
})