"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { galleryItems } from "@/data/gallery";
import ScrollFadeIn from "@/components/ScrollFadeIn";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GalleryCarousel() {
  const images = galleryItems
    .filter((item) => item.type === "image")
    .sort((a, b) => a.order - b.order);

  return (
    <ScrollFadeIn>
      <section className="py-16 sm:py-24 px-4 border-t border-bg-subtle/50">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="ornamental-heading text-left !mb-0">
              <h2>Gallery</h2>
            </div>
            <Link href="/gallery" className="view-all-link">
              View All →
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="gallery-carousel"
          >
            {images.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs">{item.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
