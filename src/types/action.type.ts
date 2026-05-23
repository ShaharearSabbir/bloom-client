export interface ActionResponse<T> {
  data: T | null;
  meta?: Meta;
  error: any;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}