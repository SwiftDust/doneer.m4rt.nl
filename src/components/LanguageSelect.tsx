"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import CountryFlag from "react-country-flag";

const LOCALES = ["nl", "en", "af"];

export function LanguageSelect() {
  const languages = [
    { label: "Nederlands", value: "nl", code: "NL", country: "NL" },
    { label: "English", value: "en", code: "US", country: "US" },
    { label: "Afrikaans", value: "af", code: "AF", country: "ZA" },
  ];

  const getCurrentLocale = () => {
    if (typeof window === "undefined") return "nl";
    const pathLang = window.location.pathname.split("/")[1];
    return LOCALES.includes(pathLang) ? pathLang : "nl";
  };

  const [language, setLanguage] = React.useState(getCurrentLocale());

  React.useEffect(() => {
    setLanguage(getCurrentLocale());
  }, []);

  const selected = languages.find((l) => l.value === language) || languages[0];

  const handleLanguageChange = (langValue: string) => {
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    if (pathParts[0] === "") pathParts.shift();
    if (LOCALES.includes(pathParts[0])) {
      pathParts[0] = langValue;
    } else {
      pathParts.unshift(langValue);
    }
    const newPath = "/" + pathParts.join("/");
    window.location.pathname = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="font-primary rounded-2xl">
        <Button variant="outline">
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          {selected.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-6rem font-primary">
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.value}
              value={lang.value}
              onClick={() => handleLanguageChange(lang.value)}
            >
              <CountryFlag
                countryCode={lang.country}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5em",
                  borderRadius: "2px",
                }}
                title={lang.label}
              />
              {lang.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
