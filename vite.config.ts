import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
<<<<<<< HEAD
    open: true // Abre o navegador automaticamente
=======
>>>>>>> 97e39b68aeb83cc01640677f86ee6959c3bb1766
  }
})