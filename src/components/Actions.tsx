import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MdKeyboardArrowRight } from "react-icons/md";
function CustomPlaceholder({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        background:
          "repeating-linear-gradient(135deg, #e0e7ef 0 20px, #cbd5e1 20px 40px)",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        fontSize: 24,
        fontFamily: "inherit",
        fontWeight: 500,
      }}
    >
      Placeholder
    </div>
  );
}

export function Actions() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card className="bg-neutral-100">
                <CardHeader className="font-primary">
                  <CardTitle>Action {index + 1}</CardTitle>
                  <CardDescription>1 January - 31 December</CardDescription>
                  <CardAction>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
                    >
                      View <MdKeyboardArrowRight />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <CustomPlaceholder width={400} height={300} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
