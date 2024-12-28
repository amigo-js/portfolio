import { defineConfig } from "vite";
import glob from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import envCompatible from "vite-plugin-env-compatible";
import dotenv from "dotenv";

// Загружаем переменные из `.env`
dotenv.config();

export default defineConfig(({ command }) => {
  const isProduction = command === "build";
  return {
    base: isProduction ? "/portfolio/" : "/", // Установите правильный base для GitHub Pages
    root: "src",
    define: {
      "process.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID),
      "process.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID),
      "process.env.VITE_EMAILJS_PUBLIC_KEY": JSON.stringify(process.env.VITE_EMAILJS_PUBLIC_KEY),
    },
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
