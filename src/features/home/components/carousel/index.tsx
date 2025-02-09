"use client";

import { HomePageImage } from "@/constants/home";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn-ui/carousel";
import { AspectRatio } from "@/components/shadcn-ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/shadcn-utils";

type ImagesCarouselProps = {
  className?: string;
  images: HomePageImage[];
}

export const ImagesCarousel = ({ images }: ImagesCarouselProps) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      className={cn("w-full h-full")}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-full w-full">
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="w-full overflow-hidden rounded-3xl border border-border h-fit">
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="w-full h-full object-cover"
                  src={img.src}
                  alt={img.alt}
                  width={1900}
                  height={1900}
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
