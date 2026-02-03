export interface Brand {
  id: string;
  name: string;
}

export interface BrandAdmin extends Brand {
}

export interface PaginatedBrands {
  total_items: number;
  total_pages: number;
  data: BrandAdmin[];
}