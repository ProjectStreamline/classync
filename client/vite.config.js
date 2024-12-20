import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // In KB
  },
  server: {
    host: true, // Listen on all network interfaces
    port: parseInt(process.env.PORT) || 3000
  },
})
