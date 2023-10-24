import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vercel from 'vite-plugin-vercel'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vercel()],
})
