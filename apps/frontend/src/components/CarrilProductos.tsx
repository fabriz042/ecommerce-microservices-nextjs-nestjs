"use client";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

import Producto from "@/components/Producto";
import { useState } from "react";

type CarrilProductosProps = {
  lista: number[];
};

const CarrilProductos = ({ lista }: CarrilProductosProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const products = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleNext = () => {
    if (startIndex + 4 < products.length) {
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
      <div className="relative border-blue-500 border-2">
        <div className="absolute flex h-full w-full justify-between z-20 pointer-events-none ">
          <div className="border-blue-500 border-4 h-full pointer-events-auto flex items-center">
            <div
              className={`bg-blue-300 rounded-full p-1.5 m-1 cursor-pointer hover:bg-blue-500 transition duration-200 ${
                startIndex === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
              onClick={handleBefore}
            >
              <MdNavigateBefore size={50} color="white" />
            </div>
          </div>

          <div className="border-blue-500 border-4 h-full pointer-events-auto flex items-center">
            <div
              className=" bg-blue-300 rounded-full p-1.5 m-1 cursor-pointer hover:bg-blue-500 transition duration-200"
              onClick={handleNext}
            >
              <MdNavigateNext size={50} color="white" />
            </div>
          </div>
        </div>

        <div className="flex bg-blanco h-full w-full overflow-hidden">
          <div
            className="p-3 flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 280}px)` }}
          >
            {lista.map((id) => (
              <Producto key={id} nombre={"produ"} precio={300} estado={"listo"} slug={"trofeo_campeonato_nacional"}/>
            ))}
            <div className="border-blue-500 border-4 m-5 w-[100px]">a</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrilProductos;
