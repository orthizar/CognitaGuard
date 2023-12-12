import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vercel from "vite-plugin-vercel";
import postcss from "./postcss.config.js";
import { fileURLToPath, URL } from "url";
import svgLoader from "vite-svg-loader";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vercel(),
    svgLoader(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
