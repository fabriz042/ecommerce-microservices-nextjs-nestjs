// Interfaces for quick product data
import { Status } from "@/types/status";

export interface ImageData {
  image_url: string;
  alt_text: string;
}

export interface Product {
  name: string;
  price: number;
  slug: string;
  status: Status;
  image: ImageData[];
}

export interface PaginatedProducts {
  total_items: number;
  total_pages: number;
  data: Product[];
}

//Interfaces for detailed product information
import { Tag } from "@/types/tag";
import { Sport } from "@/types/sport";

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  slug: string;
  weight: number;
  state: string;
  brand: string;
  category: string;
  series?: string;
  character?: string;
  tags: Tag[];
  sports: Sport[];
  image: ImageData[];
}
