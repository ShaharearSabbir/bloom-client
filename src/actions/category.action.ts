"use server";

import categoryService, {
  GetCategoriesServiceResponse,
} from "@/services/category.service";
import { Category } from "@/types/category.type";

export const createCategory = async (
  category: Omit<Category, "categoryId">,
) => {
  try {
    const result = await categoryService.createCategory(category);

    return { data: result, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to create category", error },
    };
  }
};

interface GetCategories {
  data: GetCategoriesServiceResponse["data"] | null;
  error: {
    message: string;
    error?: any;
  } | null;
}

export const getCategories = async (): Promise<GetCategories> => {
  try {
    const result = await categoryService.getCategories();
    if (!result.success) {
      return {
        data: null,
        error: { message: "Failed to get categories", error: result.message },
      };
    } else {
      return { data: result.data, error: null };
    }
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to get categories", error },
    };
  }
};
