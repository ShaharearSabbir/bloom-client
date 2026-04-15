import { Category } from "@/types/category.type";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export interface GetCategoriesServiceResponse {
  success: boolean;
  message: string;
  data: Category[];
  errorDetails?: Record<string, any>;
}

const categoryService = {
  getCategories: async (): Promise<GetCategoriesServiceResponse> => {
    const categories = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "GET",
    });
    return await categories.json();
  },
  createCategory: async (category: Omit<Category, "categoryId">) => {
    const cookiesStore = await cookies();

    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
      },
      body: JSON.stringify(category),
    });

    return await res.json();
  },
};

export default categoryService;
