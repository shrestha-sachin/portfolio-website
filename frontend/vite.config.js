import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './',
  build: {
    outDir: '../',
    emptyOutDir: false, // CRITICAL: prevent Vite from deleting the root folder contents, backend, and .git
  }
})
