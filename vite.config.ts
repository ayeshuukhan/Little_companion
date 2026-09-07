import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward classifier requests to the local backend in server/index.js
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
