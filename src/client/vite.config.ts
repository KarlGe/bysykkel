import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  server: {
    port: 3000,
  },
  plugins: [react()],
});
