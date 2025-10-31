export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogMeta {
  total_items: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface BlogListResponse {
  meta: BlogMeta;
  data: Blog[];
}
