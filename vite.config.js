import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig( {
  plugins: [ react() ],
  server: {
    allowedHosts: [ 'localhost', '1288b0d6fb1b5b.lhr.life' ],
  },
  base: "https://sumit3105.github.io/VisualDS-Playground-frontend/",
} )
