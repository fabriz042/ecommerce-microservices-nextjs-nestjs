"use client";
import React from "react";

import Container from "@/components/Container";
import ImgProductos from "@/components/ImgProductos";
import ProductCarousel from "@/components/ProductCarousel";

import { useGeoLocation } from "@/hooks/useGeoLocation";

import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsFillCartPlusFill } from "react-icons/bs";

import { getProductDetail } from "@/services/product/product.service";
import { getProductRecommendations } from "@/services/product/product.service";

import { Product, ProductDetail } from "@/types/product";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const { location } = useGeoLocation();
  const { currency } = location;

  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [recommendations, setRecommendations] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getProductDetail(slug);
      setProduct(data);
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  React.useEffect(() => {
    if (!product?.id) return;
    const fetchRecommendations = async () => {
      const data = await getProductRecommendations(product.id);
      setRecommendations(data);
    };
    fetchRecommendations();
  }, [product?.id]);

  return (
    <div className="mt-[150px] mb-[70px]">
      {product && (
        <>
          <Container>
            <div className="flex h-[600px] justify-between">
              <div className="bg-Blanco flex border-red-500 rounded-xl border-2 w-full max-w-[800px]">
                <ImgProductos images={product.image} />
              </div>

              <div className="flex flex-col justify-between border-yellow-500 rounded-xl bg-Blanco border-2 p-3 w-full max-w-[420px]">
                <div className="border-blue-500 border-2 h-24 text-right text-5xl">
                  <h1 className="leading-tight">{product.name}</h1>
                </div>
                <div className="border-blue-500 border-2 text-xl text-right">
                  <p className="text-blue-500 cursor-pointer">
                    {product.brand.name}
                  </p>
                </div>
                <div className="border-blue-500 border-2 text-xl">
                  <div className="flex">
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStarOutline />
                  </div>
                  <p className="text-blue-500 cursor-pointer">
                    6 Review example
                  </p>
                </div>
                <div className="flex justify-between border-blue-500 border-2">
                  <div className="border-red-500 border-2">
                    <p>{product.status.name}</p>
                    <div className="text-blue-500 cursor-pointer"></div>
                  </div>
                  <div className="border-red-500 border-2 text-5xl">
                    {currency} {product.price}
                  </div>
                </div>
                <div className="border-blue-500 border-2 text-xl p-2">
                  <div>
                    <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 mt-2 w-full flex justify-center cursor-pointer">
                      <div className="border-red-500 border-2 ">
                        <BsFillCartPlusFill />
                      </div>
                      <div className="border-red-500 border-2 ">
                        Agregar a la cesta
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 mt-2 w-full flex justify-center cursor-pointer">
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
                {`#${product.category.name}`}
              </div>
              <div className="p-3 m-3 bg-blue-500 text-white rounded-[20px] cursor-pointer">
                #example
              </div>
            </div>
          </Container>
          <Container>
            <div className="border-red-500 border-2 bg-Blanco ">
              <div className="border-blue-500 border-2 p-4">
                <h2 className="text-titlo mb-5">Descripción: </h2>
                <h5>{product.description}</h5>
              </div>
              <div className="border-blue-500 border-2 p-4">
                {/* General specifications table */}
                <div className="flex">
                  <div className="ml-[50px]">
                    <table>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Marca:
                          </td>
                          <td className="border px-4 py-2">
                            {product.brand.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Series:
                          </td>
                          <td className="border px-4 py-2">Series example</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">Peso</td>
                          <td className="border px-4 py-2">
                            {product.weight} g
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Incluye:
                          </td>
                          <td className="border px-4 py-2">
                            {product.includes}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="ml-[200px]">
                    {/* Specific specifications table */}
                    <table>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Largo:
                          </td>
                          <td className="border px-4 py-2">Largo ejemplo</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Ancho:
                          </td>
                          <td className="border px-4 py-2">Ancho ejemplo</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Ancho2:
                          </td>
                          <td className="border px-4 py-2">Ancho2 ejemplo</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 bg-gray-100">
                            Material:
                          </td>
                          <td className="border px-4 py-2">
                            Material1 + Material2
                          </td>
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
                <ProductCarousel products={recommendations} />
              </div>
            </div>
          </Container>
        </>
      )}
    </div>
  );
}
