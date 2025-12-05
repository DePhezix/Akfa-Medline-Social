import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import preload from "vite-plugin-preload";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preload(), tailwindcss()],
  base: "/Akfa-Medline-Social/",
});
