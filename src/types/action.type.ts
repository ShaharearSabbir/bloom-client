export interface ActionResponse<T> {
  data: T | null;
  meta?: { total: number; page: number; limit: number; totalPages: number };
  error: any;
}
