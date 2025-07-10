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

export function LanguageSelect() {
  const languages = [
    { label: "Nederlands", value: "dutch", code: "NL", country: "NL" },
    { label: "Engels", value: "english", code: "US", country: "US" },
    { label: "Afrikaans", value: "afrikaans", code: "AF", country: "ZA" },
  ];
  const [language, setLanguage] = React.useState("dutch");
  const selected = languages.find((l) => l.value === language) || languages[0];
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
            <DropdownMenuRadioItem key={lang.value} value={lang.value}>
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
