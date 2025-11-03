"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface BrandsScrollProps {
  brands: string[];
}

export default function BrandsScroll({ brands }: BrandsScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let position = 0;
    const itemWidth = 160; // 120px imagen + 40px gap
    const totalWidth = brands.length * itemWidth;

    const animate = () => {
      position += 0.4;
      if (position >= totalWidth) {
        position = 0;
      }
      scrollContainer.style.transform = `translateX(-${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [brands.length]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={scrollRef}
        className="flex space-x-10"
        style={{ transition: "none" }}
      >
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <Image
            key={index}
            src={brand}
            alt="Marcas Importadas"
            width={120}
            height={200}
            className="shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
