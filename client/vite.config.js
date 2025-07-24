import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is correct based on your deployment setup
  build: {
    outDir: 'dist', // This ensures that the build output goes to 'dist'
  },
})
