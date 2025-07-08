import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";

export function DonationButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
    >
      Doneer <MdKeyboardArrowRight />
    </Button>
  );
}
