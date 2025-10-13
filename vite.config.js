import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use ESM-style config to avoid CJS deprecation issues
export default defineConfig({
  plugins: [react()],
})
