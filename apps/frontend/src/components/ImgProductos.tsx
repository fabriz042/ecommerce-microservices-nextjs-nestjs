"use client"; // Ahora es un componente cliente

import { useState } from "react";
import Image from "next/image";

type ImgProductosProps = {
  slug: string;
  images: number;
};

export default function ImgProductos({ slug, images }: ImgProductosProps) {
  const [selectedImage, setSelectedImage] = useState(1);
  console.log("slug:", slug);
  console.log("images:", images);

  return (
    <div className="w-full flex h-full">
      <div className=" border-blue-500 border-2 h-full w-[20%] p-2 ">
        <div className="border-yellow-500 border-2 h-full overflow-y-scroll scroll-personalizado">
          {Array.from({ length: images }, (_, i) => (
            <Image
              key={i}
              src={`/productos/${slug}/${i + 1}.webp`}
              alt={`Imagen ${i + 1}`}
              width={250}
              height={250}
              className="p-2 cursor-pointer border-gray-500 border-2"
              onClick={() => {
                setSelectedImage(i + 1);
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-blue-500 border-2 h-full w-[80%] relative">
        <Image
          key={selectedImage}
          src={`/productos/${slug}/${selectedImage}.webp`}
          alt="image"
          fill={true}
          className="object-contain"
        />
      </div>
    </div>
  );
}
