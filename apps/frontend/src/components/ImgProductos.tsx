"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageData } from "@/types/product";

export default function ImgProductos({ images }: { images: ImageData[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full flex h-full">
      <div className="border-blue-500 border-2 h-full w-[20%] p-2">
        <div className="border-yellow-500 border-2 h-full overflow-y-scroll scroll-personalizado">
          {images.map((img, i) => (
            <Image
              key={img.id}
              src={img.image_url}
              alt={img.alt_text}
              width={250}
              height={250}
              className="p-2 cursor-pointer border-gray-500 border-2"
              onClick={() => setSelectedImage(i)}
            />
          ))}
        </div>
      </div>

      <div className="border-blue-500 border-2 h-full w-[80%] relative">
        <Image
          key={selectedImage}
          src={images[selectedImage].image_url}
          alt={images[selectedImage].alt_text}
          fill={true}
          className="object-contain"
        />
      </div>
    </div>
  );
}
