import { defineConfig } from "vite";
import glob from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import envCompatible from "vite-plugin-env-compatible";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src",
    build: {
      base: "/portfolio/",
      sourcemap: true,

      rollupOptions: {
        input: glob.sync("./src/*.html"),
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "commonHelpers.js",
        },
      },
      outDir: "../dist",
    },
    plugins: [injectHTML(), FullReload(["./src/**/**.html"]), envCompatible()],
    optimizeDeps: {
      entries: [],
    },
  };
});
