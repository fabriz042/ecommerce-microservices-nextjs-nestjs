"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Container from "@/components/Container";
import Producto from "@/components/ProductCard";
import Desplegable from "@/components/ui/DropdownFilter";

import { PaginatedProducts } from "@/types/product";
import { Status } from "@/types/status";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

import { getSearchResults } from "@/services/product/product.service";
import { getStatus } from "@/services/status/status.service";
import { getCategory } from "@/services/category/category.service";
import { getBrands } from "@/services/brand/brand.service";

const Busqueda = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [products, setProducts] = useState<PaginatedProducts>({
    total_items: 0,
    total_pages: 0,
    data: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  //const selectedBrand = searchParams.get("brand") || ""; (wip)
  const name = pathname.split("/").pop() || ""; // Extracts the product name from the URL and search parameters

  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= products.total_pages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStatus = (statusId: string) => {
    if (statusId === selectedStatus) {
      setSelectedStatus("");
    } else {
      setSelectedStatus(statusId);
    }
  };
  const handleBrand = (brandId: string) => {
    if (brandId === selectedBrand) {
      setSelectedBrand("");
    } else {
      setSelectedBrand(brandId);
    }
  };
  const handleCategory = (categoryId: string) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getSearchResults({
          search: name,
          page,
          per_page: 5,
          statusId: selectedStatus,
          brandId: selectedBrand,
          categoryId: selectedCategory,
        });
        setProducts({
          total_items: data.meta.total_items,
          total_pages: data.meta.total_pages,
          data: data.data,
        });
      } catch (error) {
        console.error("Error fetching the product list", error);
      }
    };

    fetchProductos();
  }, [name, selectedStatus, selectedBrand, selectedCategory, page]);

  // Fetch states using React Query
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { data: statuses = [] } = useQuery<Status[]>({
    queryKey: ["statuses"],
    queryFn: getStatus,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  return (
    <div className="mt-[150px] mb-[70px]">
      <Container>
        {/* Results section */}
        <div className="bg-fondoBlanco rounded-[30px]">
          <div className="border-red-500 border-2 p-4 flex items-center">
            <div className="text-2xl">Resultados para:</div>
            <div className="font-bold text-3xl pl-3">{name}</div>
          </div>

          <div className="flex justify-between">
            {/* Filters column */}
            <div className="border-black border-2 w-[250] p-3 gap-4 flex flex-col bg-white rounded-2xl">
              <div className="text-3xl">Filtros</div>
              {/* State filter section */}
              <div>
                <Desplegable
                  label="Estado"
                  items={statuses}
                  selected={selectedStatus}
                  onSelect={handleStatus}
                />
              </div>
              {/* Brand filter section */}
              <div>
                <Desplegable
                  label="Marca"
                  items={brands}
                  selected={selectedBrand}
                  onSelect={handleBrand}
                />
              </div>
              {/* Category filter section */}
              <div>
                <Desplegable
                  label="Categorías"
                  items={categories}
                  selected={selectedCategory}
                  onSelect={handleCategory}
                />
              </div>
            </div>

            {/* ------------------------Search column -----------------------*/}
            <div className="flex flex-col w-full">
              {/* Total products and sort by */}
              <div className="flex items-center justify-between border-gray-500 border-2 px-5">
                <div className="text-xl p-3">
                  <span className="font-bold">{products.total_items}</span>{" "}
                  productos encontrados
                </div>
                <div>
                  <select name="sort" id="sort" className="border p-2 rounded">
                    <option value="">Ordenar por:</option>
                    <option value="price-asc">Precio: bajo a alto</option>
                    <option value="price-desc">Precio: alto a bajo</option>
                    <option value="name-asc">Más nuevo</option>
                    <option value="name-desc">Más antiguo</option>
                  </select>
                </div>
              </div>

              {/* -------------------------- Products --------------------------- */}
              <div className="border-gray-500 border-2 w-full flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 border-green-500 border-2 ">
                  {products.total_items === 0 ? (
                    <p>No se encontraron productos</p>
                  ) : (
                    products.data.map((product, index) => (
                      <Producto key={index} product={product} />
                    ))
                  )}
                </div>
              </div>
              {products.total_items !== 0 && (
                <div className="border-red-500 border-2 text-xl p-2 text-center mt-10">
                  <div className="flex justify-center items-center gap-4">
                    <div
                      onClick={() => handlePageChange(page - 1)}
                      className={`cursor-pointer ${
                        page === 1 ? "opacity-0 pointer-events-none" : ""
                      } transition-opacity duration-400 ease-in-out`}
                    >
                      <IoIosArrowBack size={35} />
                    </div>
                    <div className="text-2xl">
                      Página {page} de {products.total_pages}
                    </div>
                    <div
                      onClick={() => handlePageChange(page + 1)}
                      className={`cursor-pointer ${
                        page === products.total_pages
                          ? "opacity-0 pointer-events-none"
                          : ""
                      } transition-opacity duration-400 ease-in-out`}
                    >
                      <IoIosArrowForward size={35} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Busqueda;
