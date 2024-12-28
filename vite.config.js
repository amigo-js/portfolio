import { defineConfig } from "vite";
import glob from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";
  return {
    base: isProduction ? "/portfolio/" : "/",
    root: "src",
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync("./src/*.html"),
      },
      outDir: "../dist",
    },
    plugins: [
      injectHTML(),
      FullReload(["./src/**/**.html"]),
      envCompatible(),
    ],
  };
});
