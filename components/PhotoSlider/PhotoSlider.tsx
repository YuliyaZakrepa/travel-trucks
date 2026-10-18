

"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CamperImage } from "@/types/camperDetails";
import css from "./PhotoSlider.module.css";

interface PhotoSliderProps {
  images: CamperImage[];
  name: string;
}

export default function PhotoSlider({ images, name }: PhotoSliderProps) {
  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <Swiper
      modules={[Pagination, Keyboard, Autoplay]}
      pagination={{ type: "fraction" }}
      className={css.slider}
      loop={true}
      grabCursor={true}
      keyboard={{ enabled: true }}
      observer={true}
      observeParents={true}
      watchSlidesProgress={true}
      slideToClickedSlide={true}
      onClick={(swiper) => swiper.slideNext()}
    >
      {sorted.map((img, index) => (
        <SwiperSlide key={img.id} className={css.slide}>
          <Image
            src={img.original}
            alt={`${name}, photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            priority={index === 0}
            className={css.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
