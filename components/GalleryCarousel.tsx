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
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-gold/40 text-[10px] font-sans uppercase tracking-[4px] mb-2">Memories</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text-bright tracking-wider">Gallery</h2>
            </div>
            <Link href="/gallery" className="view-all-link">
              View All
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.15}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
            className="gallery-carousel"
          >
            {images.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/90 text-xs font-sans tracking-wide">{item.caption}</p>
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
