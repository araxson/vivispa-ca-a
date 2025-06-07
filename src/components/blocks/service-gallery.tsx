"use client";

import Image from "next/image";
import {
  Card,
  Section,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { ZoomIn } from "lucide-react";
import { SectionHeader } from "./section-header";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface ServiceGalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ServiceGallery({
  images,
  title = "Before & After Gallery",
  subtitle = "See the amazing transformations",
  className,
}: ServiceGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <Section
      spacing="lg"
      className={className}
    >
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-0 relative">
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-500 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300">
                        <ZoomIn
                          className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {image.caption && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                          {image.caption}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-5xl p-0 border-0 bg-transparent">
              <DialogHeader className="sr-only">
                <DialogTitle>{image.alt}</DialogTitle>
              </DialogHeader>
              <div className="relative px-4 sm:px-6 md:px-8 lg:px-10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  priority
                />

                {image.caption && (
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Section>
  );
}
