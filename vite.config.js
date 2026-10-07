import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite would default to 5173. We pin 3000 so everyone in the group opens
  // the same address, and so the port in the README is always the right one.
  server: { port: 3000 },
})
