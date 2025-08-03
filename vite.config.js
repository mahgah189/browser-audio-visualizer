import { defineConfig } from "vite"
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        content: resolve(__dirname, "src/extension/content/content.js"),
      },
      // this stops Vite from adding random hashes to the file outputs.
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js", 
        assetFileNames: "[name].[ext]",
      }
    },
  },
});
