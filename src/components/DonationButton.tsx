import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { astroI18n, t } from "astro-i18n";

astroI18n.locale;

interface Subscriber {
  email: string;
  name: string;
  status: "enabled" | "blocklisted";
  lists: number[];
}

function submitSubscriber(subscriber: Subscriber): Promise<Subscriber[]> {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `token api:${import.meta.env.TOKEN}`);

  const request = new Request("https://listmonk.m4rt.nl/api/subscribers", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(subscriber),
  });

  return fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data as Subscriber[];
    });
}

export function DonationButton() {
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSmOrLarger, setIsSmOrLarger] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 640 : true,
  );
  // State for shadcn inputs
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSmOrLarger(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
        >
          {t("donationButton.donateText")} <MdKeyboardArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="font-primary">
          <DialogTitle>{t("donationButton.donateText")}</DialogTitle>
        </DialogHeader>
        <div className="font-primary flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
          <div className="grid flex-1 gap-2">
            <DialogDescription className="w-full break-words">
              {t("donationPopup.description")}
            </DialogDescription>
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder={t("donationPopup.link")}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Input
              id="name"
              placeholder={t("donationPopup.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="surname"
              placeholder={t("donationPopup.surname")}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
              onClick={async () => {
                setSubmitStatus(null);
                setSubmitMessage("");
                try {
                  await submitSubscriber({
                    email: link,
                    name: name + (surname ? " " + surname : ""),
                    status: "enabled",
                    lists: [3], // "Mart naar Zuid-Afrika" list ID
                  });
                  setSubmitStatus("success");
                  setSubmitMessage(t("donationPopup.success"));
                  setLink("");
                  setName("");
                  setSurname("");
                } catch (e) {
                  console.error(e);
                  setSubmitStatus("error");
                  setSubmitMessage(t("donationPopup.error"));
                }
              }}
            >
              {t("donationPopup.submit")}
            </Button>
            {submitStatus === "success" && (
              <p className="mt-2 text-sm text-green-600">{submitMessage}</p>
            )}
            {submitStatus === "error" && (
              <p className="mt-2 text-sm text-red-600">{submitMessage}</p>
            )}
          </div>
          <Separator orientation={isSmOrLarger ? "vertical" : "horizontal"} />
          <div className="grid flex-1 gap-2">
            <DialogDescription className="w-full break-words">
              {t("donationPopup.donateText")}
            </DialogDescription>
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
              <div className="hidden justify-center rounded-lg bg-gray-100 p-4 sm:flex md:justify-end">
                <QRCode
                  size={128}
                  value="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=e9r1Z9cuTnKGF-ImJkUEmg"
                  className="h-auto w-full max-w-[128px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-primary rounded-2xl bg-[rgb(204,0,102)] text-white hover:bg-pink-400"
                >
                  <img
                    src="https://d1twnm33rljaon.cloudfront.net/Archive/ideal-logo-1024.png"
                    alt="iDeal logo"
                    className="h-6 w-auto"
                  />
                  <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=e9r1Z9cuTnKGF-ImJkUEmg">
                    iDeal
                  </a>
                </Button>
                {/*
                <Button
                  variant="outline"
                  size="sm"
                  className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
                >
                  <img src="/visa.png" alt="Visa logo" className="h-2 w-auto" />
                  Creditcard
                </Button>*/}
                <Button
                  variant="outline"
                  size="sm"
                  className="font-primary rounded-2xl bg-[#026cff] text-white hover:bg-blue-400"
                >
                  <img
                    src="/paypal.png"
                    alt="PayPal logo"
                    className="h-4 w-auto"
                  />
                  <a href="https://paypal.me/notabena">PayPal</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="font-primary sm:justify-start">
          <p className="text-xs text-gray-500">
            {t("donationPopup.bankTransfer")}
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
