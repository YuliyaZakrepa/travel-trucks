"use client";
import { useEffect, useRef } from "react";
import css from "./Rating.module.css";
import Raty from "raty-js";

interface RatingProps {
  score: number;
}

export default function Rating({ score }: RatingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const raty = new Raty(el, {
      score,
      number: 5,
      readOnly: true,
      space: false,
      starType: 'img',
       path: '/rating/',
      starOn: "star-on.svg",
      starOff: "star-off.svg",
    });
    raty.init();

    return () => {
      el.innerHTML = "";
    };
  }, [score]);

  return <div ref={ref} className={css.rating} />;
}