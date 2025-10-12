"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Container from "@/components/Container";
import Producto from "@/components/Producto";
import Desplegable from "@/components/ui/DropdownFilter";

import { PaginatedProducts } from "@/domain/entities/product";
import { State } from "@/domain/entities/state";
import { Brand } from "@/domain/entities/brand";
import { Category } from "@/domain/entities/category";

import { getSearchResults } from "@/services/product/product.service";
import { getStates } from "@/services/state/state.service";
import { getCategories } from "@/services/category/category.service";
import { getBrands } from "@/services/brand/brand.service";

const Busqueda = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [products, setProducts] = useState<PaginatedProducts>({
    count: 0,
    num_pages: 0,
    results: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  //const selectedBrand = searchParams.get("brand") || ""; (wip)
  const name = pathname.split("/").pop() || ""; // Extracts the product name from the URL and search parameters

  const [page, setPage] = useState(1);

  // Handles pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= products.num_pages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleState = (state: string) => {
    if (state === selectedState) {
      setSelectedState("");
    } else {
      setSelectedState(state);
    }
  };
  const handleBrand = (brand: string) => {
    if (brand === selectedBrand) {
      setSelectedBrand("");
    } else {
      setSelectedBrand(brand);
    }
  };
  const handleCategory = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getSearchResults({
          search: name,
          page,
          limit: 5,
          state: selectedState,
          brand: selectedBrand,
          category: selectedCategory,
        });
        setProducts({
          count: data.count,
          num_pages: Math.ceil(data.count / 5),
          results: data.results,
        });
      } catch (error) {
        console.error("Error fetching the product list", error);
      }
    };

    fetchProductos();
  }, [name, selectedState, selectedBrand, selectedCategory, page]);

  // Fetch states using React Query
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { data: states = [] } = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
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
                  items={states}
                  selected={selectedState}
                  onSelect={handleState}
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
                  <span className="font-bold">{products.count}</span> productos
                  encontrados
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
                  {products.count === 0 ? (
                    <p>No se encontraron productos</p>
                  ) : (
                    products.results.map((product, index) => (
                      <Producto key={index} product={product} />
                    ))
                  )}
                </div>
              </div>
              {products.count !== 0 && (
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
                      Página {page} de {products.num_pages}
                    </div>
                    <div
                      onClick={() => handlePageChange(page + 1)}
                      className={`cursor-pointer ${
                        page === products.num_pages
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
