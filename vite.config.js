import { defineConfig } from "vite";
import { copyFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const root = resolve(process.cwd(), "browser-audio-visualizer");
const outDir = resolve(process.cwd(), "dist");

const staticFiles = [
  "manifest.json",
  "background.js",
  "scripts/service-worker.js",
];

function copyStaticFiles() {
  return {
    name: "copy-static-files",
    writeBundle() {
      for (const file of staticFiles) {
        const dest = resolve(outDir, file);
        mkdirSync(dirname(dest), { recursive: true });
        copyFileSync(resolve(root, file), dest);
      }
    },
  };
}

export default defineConfig({
  root,
  build: {
    rollupOptions: {
      input: {
        sidepanel: resolve(root, "sidepanel/sidepanel.html"),
        popup: resolve(root, "popup/popup.html"),
        offscreen: resolve(root, "offscreen/offscreen.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    outDir,
    emptyOutDir: true,
  },
  plugins: [copyStaticFiles()],
});
