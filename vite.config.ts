import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vercel from "vite-plugin-vercel";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vercel(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
});
