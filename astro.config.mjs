import { defineConfig } from "astro/config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  site: "https://doneer.m4rt.nl",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  adapter: vercel(),
  assets: "public",
  integrations: [react(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
    // Enable custom components in Markdown
    gfm: true,
    extendDefaultPlugins: true,
  },
});