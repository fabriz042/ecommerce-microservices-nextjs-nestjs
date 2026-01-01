// Interfaces for quick product data
import { Status } from "../status/status.interface";

export interface ImageData {
  id: string;
  image_url: string;
  alt_text: string;
}

export interface Product {
  name: string;
  slug: string;
  price: number;
  status: Status;
  image: ImageData[];
}

export interface PaginatedProducts {
  total_items: number;
  total_pages: number;
  data: Product[];
}

//Interfaces for detailed product information
import { Tag } from "../../types/tag";
import { Sport } from "../../types/sport";
import { Brand } from "../brand/brand.interface";
import { Category } from "../category/category.interface";

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  slug: string;
  weight: number;
  brand: Brand;
  includes: string;
  category: Category;
  status: Status;
  series?: string;
  character?: string;
  tags: Tag[];
  sports: Sport[];
  image: ImageData[];
}


export interface ProductAdmin {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: Category;
  status: Status;
  stock: number;
  image: ImageData[];
}