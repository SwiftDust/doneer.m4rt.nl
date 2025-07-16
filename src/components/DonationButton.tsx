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
import Link from "next/link";

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
          Doneer of blijf op de hoogte <MdKeyboardArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="font-primary">
          <DialogTitle>Doneer of blijf op de hoogte</DialogTitle>
        </DialogHeader>
        <div className="font-primary flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
          <div className="grid flex-1 gap-2">
            <DialogDescription className="w-full break-words">
              Aanmelden om updates per e-mail te ontvangen
            </DialogDescription>
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" placeholder="jouw@email.nl" />
            <Input id="name" placeholder="Naam" />
            <Input id="surname" placeholder="Achternaam" />
            <Button
              variant="outline"
              size="sm"
              className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
            >
              Hou me op de hoogte!
            </Button>
          </div>
          <Separator orientation={isSmOrLarger ? "vertical" : "horizontal"} />
          <div className="grid flex-1 gap-2">
            <DialogDescription className="w-full break-words">
              Doneren via iDeal QR-code of iDeal link (Nederland), creditkaart
              of PayPal
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
                  <Link href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=e9r1Z9cuTnKGF-ImJkUEmg">
                    iDeal
                  </Link>
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
                  <Link href="https://paypal.me/notabena">PayPal</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="font-primary sm:justify-start">
          <p className="text-xs text-gray-500">
            Betalen via banktransfer kan ook: NL53 RABO 0316 8722 02 tnv. Mart
            Zielman met als onderwerp Donatie SHIB-reis Zuid-Afrika 2027.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
