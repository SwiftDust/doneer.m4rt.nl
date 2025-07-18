import { defineConfig } from "astro/config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify";
import "./astro-i18n.config.ts";

export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  adapter: netlify(),
  integrations: [react()],
});