import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function Producto({ product }: { product: Product }) {
  const { image, name, price, slug, status } = product;
  const statusColors: { [key: string]: string } = {
    "En stock": "bg-green-300",
    "En camino": "bg-yellow-300",
    "A pedido": "bg-orange-300",
    "Pre-Orden": "bg-purple-300",
    "No disponible": "bg-gray-300",
  };
  const statusColor = statusColors[status.name] || "bg-gray-300";

  return (
    <div>
      <Link href={`/productos/guante/${slug}`}>
        <div className="shadow-lg rounded-xl w-[200px] h-[400px] lg:w-[250px] bg-white m-5">
          <div
            className={`${statusColor} text-black w-[85px] p-1 z-10 text-base md:text-lg shadow-lg rounded-tl-xl rounded-br-xl text-center`}
          >
            {status.name}
          </div>
          <div className="border-green-500 border-2 flex h-[250px] w-[250px] justify-center items-center">
            <Image
              src={image[0]?.image_url}
              alt={image[0]?.alt_text}
              width={200}
              height={200}
              className="transition-transform duration-300 ease-in-out transform scale-90 hover:scale-100 object-contain max-w-full max-h-full"
            />
          </div>
          <div>
            <div className="border-red-500 border-2 h-[65px]">
              <p className="text-black text-base md:text-2xl text-left leading-none pl-2">
                {name}
              </p>
            </div>
            <div className="border-green-500 border-2 p-1.5">
              <p className="text-black text-base md:text-2xl text-left font-acme pl-2">
                s/. {price.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
