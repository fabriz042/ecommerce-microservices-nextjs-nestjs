//librerias
import React from "react";
//componentes
import Container from "@/components/Container";
import ImgProductos from "@/components/ImgProductos";
import CarrilProductos from "@/components/CarrilProductos";

//hooks
import { useGeoLocation } from "@/hooks/useGeoLocation";

//iconos
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsFillCartPlusFill } from "react-icons/bs";

import { getDetalles } from "@/services/product/product.service";

interface producto {
  nombre: string;
  images: number;
  precio: number;
  slug: string;
  estado__nombre: string;
  descripcion?: string;
  peso?: number;
  incluye?: string;
}

interface ProductosParams {
  slug: string;
}

export default async function Productos({
  params,
}: {
  params: Promise<ProductosParams>;
}) {
  const { slug } = await params;
  const { countryName, currency } = useGeoLocation();

  let producto: producto = {
    nombre: "",
    images: 0,
    precio: 0,
    slug: "",
    estado__nombre: "",
    descripcion: "",
    peso: 0,
    incluye: "",
  };

  try {
    const datos = await getDetalles(slug);
    producto = datos.data[0];
    console.log("Producto:", producto);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }

  return (
    <div>
      <Container>
        <div className="flex h-[600px] justify-between">
          <div className="bg-Blanco flex border-red-500 rounded-xl border-2 w-full max-w-[800px]">
            <ImgProductos slug={slug} images={producto.images} />
          </div>

          <div className="flex flex-col justify-between border-yellow-500 rounded-xl bg-Blanco border-2 p-3 w-full max-w-[420px]">
            <div className="border-blue-500 border-2 h-24 text-right text-5xl">
              <h1 className="leading-tight">{producto.nombre}</h1>
            </div>
            <div className="border-blue-500 border-2 text-xl text-right">
              <p className="text-blue-500 cursor-pointer">Easton</p>
            </div>
            <div className="border-blue-500 border-2 text-xl">
              <div className="flex">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStarOutline />
              </div>
              <p className="text-blue-500 cursor-pointer">6 Reseñas</p>
            </div>
            <div className="flex justify-between border-blue-500 border-2">
              <div className="border-red-500 border-2">
                <p>En stock</p>
                <div className="text-blue-500 cursor-pointer"></div>
              </div>
              <div className="border-red-500 border-2 text-5xl">
                {countryName} {producto.precio}
              </div>
            </div>
            <div className="border-blue-500 border-2 text-xl p-2">
              <div>
                <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 mt-2 w-full flex justify-center">
                  <div className="border-red-500 border-2 ">
                    <BsFillCartPlusFill />
                  </div>
                  <div className="border-red-500 border-2 ">
                    Agregar a la cesta
                  </div>
                </button>
              </div>
              <div>
                <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 mt-2 w-full flex justify-center">
                  <div>
                    <IoIosHeartEmpty />
                  </div>
                  <div>Añadir a favoritos</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex">
          <div className="p-3 m-3 bg-blue-500 text-white rounded-[20px] cursor-pointer">
            #Durabilidad
          </div>
          <div className="p-3 m-3 bg-blue-500 text-white rounded-[20px] cursor-pointer">
            #Flexible
          </div>
        </div>
      </Container>
      <Container>
        <div className="border-red-500 border-2 bg-Blanco ">
          <div className="border-blue-500 border-2 p-4">
            <h2 className="text-titlo mb-5">Descripción: </h2>
            <h5>{producto.descripcion}</h5>
          </div>
          <div className="border-blue-500 border-2 p-4">
            <h1 className="text-titlo mb-5">Especificaciones:</h1>
            <div className="flex">
              <div className="ml-[50px]">
                <table>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Peso:</td>
                      <td className="border px-4 py-2">{producto.peso}g</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Nombre</td>
                      <td className="border px-4 py-2">Producto A</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Incluye:</td>
                      <td className="border px-4 py-2">{producto.incluye}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ml-[200px]">
                <table>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Peso:</td>
                      <td className="border px-4 py-2">{producto.peso}g</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Nombre</td>
                      <td className="border px-4 py-2">Producto A</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-gray-100">Incluye:</td>
                      <td className="border px-4 py-2">{producto.incluye}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="bg-Blanco">
          <div className="text-titlo">Podria Gustarte</div>
          <div className="p-9">
            <CarrilProductos lista={[1, 2, 3, 4, 5, 6, 7]} />
          </div>
        </div>
      </Container>
    </div>
  );
}
