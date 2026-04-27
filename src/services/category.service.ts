import { Category } from "@/types/category.type";
import { ServiceResponse } from "@/types/service.tye";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

const categoryService = {
  getCategories: async (
    limit?: number,
  ): Promise<ServiceResponse<Category[]>> => {
    const categories = await fetch(
      `${BACKEND_URL}/api/categories${limit ? `?limit=${limit}` : ""}`,
      {
        method: "GET",
      },
    );
    return await categories.json();
  },
  createCategory: async (
    category: Omit<Category, "categoryId">,
  ): Promise<ServiceResponse<Category>> => {
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
