export interface Status {
  id: string;
  name: string;
}

export interface StatusAdmin extends Status {
}

export interface PaginatedStatus {
  total_items: number;
  total_pages: number;
  data: StatusAdmin[];
}