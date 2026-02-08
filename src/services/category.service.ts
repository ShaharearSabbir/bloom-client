import { Category } from "@/types/category";
import { cookies } from "next/headers";

const categoryService = {
  getCategories: async () => {
    const categories = await fetch(
      `${process.env.BACKEND_URL}/api/categories`,
      {
        method: "GET",
      },
    );
    return (await categories.json()) as Category[];
  },
  createCategory: async (category: Omit<Category, "categoryId">) => {
    const cookiesStore = await cookies();

    const res = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
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
