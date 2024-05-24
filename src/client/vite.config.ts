import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./env",
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
