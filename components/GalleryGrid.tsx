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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((item, i) => (
          <div
            key={item.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
              i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/3]"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-bg-elevated flex items-center justify-center">
                <svg className="w-12 h-12 text-gold/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white/90 text-xs font-sans tracking-wide">{item.caption}</p>
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
