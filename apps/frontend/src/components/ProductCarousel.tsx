"use client";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

import Producto from "@/components/ProductCard";
import { useState } from "react";

import { Product } from "@/types/product";

const ProductCarousel = ({ products }: { products: Product[] }) => {
  const [startIndex, setStartIndex] = useState(0);

  const totalCards = products.length + 1;

  const handleNext = () => {
    if (startIndex + 4 < totalCards) {
      setStartIndex(startIndex + 1);
    }
  };
  const handleBefore = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
      <div className="relative debug">
        <div className="absolute flex h-full w-full justify-between z-20 pointer-events-none ">
          <div className="h-full pointer-events-auto flex items-center">
            <div
              className={`button-color1 rounded-full p-1.5 m-1 cursor-pointer transition duration-200 ${
                startIndex === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
              onClick={handleBefore}
            >
              <MdNavigateBefore size={50} color="white" />
            </div>
          </div>

          <div className="h-full pointer-events-auto flex items-center">
            <div
              className={`button-color1 rounded-full p-1.5 m-1 cursor-pointer transition duration-200 ${
                startIndex + 4 === totalCards
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
              onClick={handleNext}
            >
              <MdNavigateNext size={50} color="white" />
            </div>
          </div>
        </div>

        <div className="flex bg-blanco h-full w-full overflow-hidden">
          <div
            className="p-3 flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 250}px)` }}
          >
            {products.map((product) => (
              <Producto key={product.slug} product={product} />
            ))}
            <div className="flex flex-col justify-center items-center w-[200px] cursor-pointer">
              <span className="text-blue-700 font-bold text-xl text-center border-blue-500 border-4 rounded-lg p-2">
                Ver todos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
