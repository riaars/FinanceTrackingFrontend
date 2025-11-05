import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // <- key line
    },
  },
});
