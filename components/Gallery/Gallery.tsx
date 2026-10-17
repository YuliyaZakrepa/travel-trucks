"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { CamperImage } from "@/types/camperDetails";
import css from "./Gallery.module.css";

interface GalleryProps {
  images: CamperImage[];
  name: string;
}

export default function Gallery({ images, name }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className={css.gallery}>
      <Swiper
        modules={[FreeMode, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className={css.main}
      >
        {sorted.map((img) => (
          <SwiperSlide key={img.id} className={css.mainSlide}>
            <Image
              src={img.original}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className={css.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={32}
        freeMode
        watchSlidesProgress
        className={css.thumbs}
      >
        {sorted.map((img) => (
          <SwiperSlide key={img.id} className={css.thumbSlide}>
            <Image
              src={img.thumb}
              alt=""
              fill
              sizes="150px"
              className={css.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}