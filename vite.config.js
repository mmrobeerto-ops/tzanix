import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Aumenta el límite para que el aviso de >500 kB no se muestre
    chunkSizeWarningLimit: 1000, // valor en kB (puedes ajustarlo)
  },
});
