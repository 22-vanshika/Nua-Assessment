// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // We've added this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // And we've added this 'resolve' block
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})