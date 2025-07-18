import { defineConfig } from "astro/config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify";

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
  adapter: node({
    mode: "standalone",
    host: "0.0.0.0",
    port: 4321,
  }),
  integrations: [react()],
});
