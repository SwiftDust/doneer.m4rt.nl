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
import type { CollectionEntry } from "astro:content";
import { astroI18n, t } from "astro-i18n";
astroI18n.locale;

interface ActionsProps {
  posts: CollectionEntry<"blog">[];
}

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "finished":
      return "bg-red-500 text-white";
    case "in progress":
      return "bg-green-500 text-white";
    case "coming soon":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

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

export function Actions({ posts }: ActionsProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {posts.map((post, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card className="bg-neutral-100">
                <CardHeader className="font-primary">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {post.data.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${getTagColor(tag)}`}
                      >
                        {t(`actions.${tag.replace(/\s/g, "")}`)}
                      </span>
                    ))}
                  </div>
                  <CardTitle>{post.data.title}</CardTitle>
                  <CardDescription>
                    {post.data.startDate.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                    {(() => {
                      const tags = post.data.tags.map((t) => t.toLowerCase());
                      const isFinished = tags.includes("finished");
                      const isInProgress = tags.includes("in progress");
                      if (post.data.endDate) {
                        return (
                          " - " +
                          post.data.endDate.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                          })
                        );
                      } else if (isFinished) {
                        return "";
                      } else if (isInProgress) {
                        return " - now";
                      } else {
                        return "";
                      }
                    })()}
                  </CardDescription>
                  <CardAction>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-primary bg-primary-light rounded-2xl text-white hover:bg-blue-400"
                      asChild
                    >
                      <a href={`/posts/${post.id}`}>
                        View <MdKeyboardArrowRight />
                      </a>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {post.data.image ? (
                    <img
                      src={post.data.image.url}
                      alt={post.data.image.alt}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <CustomPlaceholder width={400} height={300} />
                  )}
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
