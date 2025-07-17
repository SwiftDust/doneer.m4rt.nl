import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  primaryLocale: "nl", // default app locale
  secondaryLocales: ["en", "af"], // other supported locales
  fallbackLocale: "nl", // fallback locale (on missing translation)
  trailingSlash: "never", // "never" or "always"
  run: "client+server", // "client+server" or "server"
  showPrimaryLocale: true, // "/en/about" vs "/about"
  translationLoadingRules: [
    {
      routes: ["/404"],
      groups: ["common"],
    },
    {
      routes: [""],
      groups: ["components"],
    },
  ], // per page group loading
  translationDirectory: {}, // translation directory names
  translations: {}, // { [translation_group1]: { [locale1]: {}, ... } }
  routes: {}, // { [secondary_locale1]: { about: "about-translated", ... } }
});
