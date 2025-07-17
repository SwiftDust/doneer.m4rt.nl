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

export function DonationButton() {
  const [isSmOrLarger, setIsSmOrLarger] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 640 : true,
  );

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
            <Input id="link" placeholder={t("donationPopup.link")} />
            <Input id="name" placeholder={t("donationPopup.name")} />
            <Input id="surname" placeholder={t("donationPopup.surname")} />
            <Button
              variant="outline"
              size="sm"
              className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
            >
              {t("donationPopup.submit")}
            </Button>
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
