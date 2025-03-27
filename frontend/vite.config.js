import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://moviemate-95nb.onrender.com",
      "/uploads/": "https://moviemate-95nb.onrender.com",
    },
  },
});