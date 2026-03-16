"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryItems, GalleryItem } from "@/data/gallery";
import Lightbox from "@/components/Lightbox";

export default function GalleryGrid() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const sorted = [...galleryItems].sort((a, b) => a.order - b.order);

  const currentIndex = selectedItem
    ? sorted.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setSelectedItem(sorted[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < sorted.length - 1)
      setSelectedItem(sorted[currentIndex + 1]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sorted.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
            ) : (
              <div className="w-full h-full bg-bg-subtle flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
