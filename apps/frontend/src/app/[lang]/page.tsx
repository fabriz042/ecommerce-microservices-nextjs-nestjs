import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

import Container from "@/components/Container";
import ProductCarousel from "@/components/ProductCarousel";
import FaqSection from "@/components/FaqSection";
import BrandsScroll from "@/components/BrandsScroll";

import { getSearchResults } from "@/services/product/product.service";

export default async function Home() {
  const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });

  const response = await getSearchResults({ search: "", per_page: 6 });
  const products = response.data;

  const brands = [
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
    "/images/brand1.jpg",
  ];

  return (
    <div className="mx-auto">
      {/*Carousel*/}
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="h-[800px]">
          <CarouselItem className="min-w-full relative flex items-center justify-center text-white text-2xl">
            <Image
              src="/cancha.jpeg"
              alt="Logo"
              fill
              style={{
                objectFit: "cover",
                filter: "blur(8px)",
                transform: "scale(1.01)",
              }}
            />

            <div className="absolute z-10 flex justify-evenly items-center">
              <div className="z-10">
                <Image
                  src="/images/ProductBanner1.png"
                  alt="Pelota"
                  width={550}
                  height={550}
                  style={{
                    filter: "drop-shadow(0 15px 20px rgba(0, 0, 0, 0.4))",
                  }}
                />
              </div>
              <div className="space-y-12 flex flex-col justify-center w-1/2">
                <div className="z-10 font-bold text-5xl">
                  Kit SWITCH™ Sports
                </div>
                <div className="z-10 text-4xl">
                  Un producto innovador con todo lo que necesitas
                </div>
                <div className="bg-gray-800 p-3 text-xl rounded-xl cursor-pointer text-white text-center hover:scale-102 hover:shadow-xl hover:bg-gray-900 transition-all duration-300 w-[180px] ml-auto">
                  <span> Comprar</span>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="min-w-full bg-red-500 flex items-center justify-center text-white text-2xl">
            Slide 2
          </CarouselItem>
          <CarouselItem className="min-w-full bg-green-500 flex items-center justify-center text-white text-2xl">
            Slide 3
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-50 top-1/2 -translate-y-1/2 p-2 text-white"
          variant="ghost"
        />
        <CarouselNext
          className="absolute right-50 top-1/2 -translate-y-1/2 p-2 text-white"
          variant="ghost"
        />
      </Carousel>
      {/*Background*/}
      <div className="w-full relative">
        {/*Wave Divider*/}
        <div className="absolute left-0 w-full z-10" style={{ top: "-50px" }}>
          <Image
            src="/images/waves.svg"
            alt="Fondo FAQ"
            width={1980}
            height={80}
            sizes="100vw"
            style={{ width: "100vw", height: "80px" }}
          />
        </div>
        {/*Category Section*/}
        <Container>
          <div className="bg-white rounded-lg flex flex-col items-center p-8 space-y-8 mt-5">
            <span className="text-2xl font-bold text-link">Categorias</span>
            <div className="flex items-center justify-evenly w-full">
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer 
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer 
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer 
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
              <div
                className="h-[400px] w-[170px] border-4 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer 
                  transition-transform duration-300 hover:translate-y-[-18px]"
              >
                <Image
                  src="/images/cate1.png"
                  alt="Categoría 1"
                  width={200}
                  height={100}
                />
                <span className="absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-black font-bold text-xl">
                  Pelotas
                </span>
              </div>
            </div>
          </div>
        </Container>
        {/*New Section*/}
        <Container>
          <div className="bg-white rounded-lg p-8">
            <span className="font-bold text-2xl text-link cursor-pointer">
              Novedades {""}
              {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
            </span>
            <div className="mt-6">
              <ProductCarousel products={products} />
            </div>
          </div>
        </Container>

        {/*Reasons Section*/}
        <Container>
          <div className="p-8">
            <div className="flex justify-evenly">
              <div className="bg-white w-62 h-62 rounded-3xl items-center justify-center flex flex-col shadow-lg">
                <Image
                  src="/images/box.png"
                  alt="Envío discretos"
                  width={140}
                  height={140}
                  className="rounded-3xl"
                />
                <span className="font-bold">Lorem Ipsum</span>
                <p className="text-center px-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
              </div>
              <div className="bg-white w-62 h-62 rounded-3xl items-center justify-center flex flex-col shadow-lg">
                <Image
                  src="/images/box.png"
                  alt="Envío discretos"
                  width={140}
                  height={140}
                  className="rounded-3xl"
                />
                <span className="font-bold">Lorem Ipsum</span>
                <p className="text-center px-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
              </div>
              <div className="bg-white w-62 h-62 rounded-3xl items-center justify-center flex flex-col shadow-lg">
                <Image
                  src="/images/box.png"
                  alt="Envío discretos"
                  width={140}
                  height={140}
                  className="rounded-3xl"
                />
                <span className="font-bold">Lorem Ipsum</span>
                <p className="text-center px-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
              </div>
              <div className="bg-white w-62 h-62 rounded-3xl items-center justify-center flex flex-col shadow-lg">
                <Image
                  src="/images/box.png"
                  alt="Envío discretos"
                  width={140}
                  height={140}
                  className="rounded-3xl"
                />
                <span className="font-bold">Lorem Ipsum</span>
                <p className="text-center px-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/*Stock Section*/}
        <Container>
          <div className="bg-white rounded-lg p-8">
            <span className="font-bold text-2xl text-link cursor-pointer">
              Productos en Stock
            </span>
            <div className="mt-6">
              <ProductCarousel products={products} />
            </div>
          </div>
        </Container>

        {/*Brands-Import Section*/}
        <div className="bg-white flex flex-col items-center space-y-4 p-6 mt-6 mb-6">
          <span className="font-bold text-2xl">
            ¿No encuentras lo que quieres?
          </span>
          <span className="font-bold text-2xl">Te lo traemos!!</span>

          <div className="w-full relative">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-20 h-full">
              <div className="bg-linear-to-l from-transparent to-white h-full w-64"></div>
              <div className="bg-linear-to-r from-transparent to-white h-full w-64"></div>
            </div>
            <div className="mt-6 mb-10">
              <BrandsScroll brands={brands} />
            </div>
          </div>

          <div className="bg-gray-800 p-3 text-xl rounded-xl cursor-pointer text-white text-center hover:scale-102 hover:shadow-xl hover:bg-gray-900 transition-all duration-300">
            <span> Cotiza</span>
            <span> sin compromiso</span>
          </div>
        </div>

        {/*FAQ Section*/}
        <FaqSection />
      </div>
    </div>
  );
}
