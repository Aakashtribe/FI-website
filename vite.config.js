import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project site at /FI-website/, but the local
  // dev server should still run at the root.
  base: command === 'build' ? '/FI-website/' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
}))
