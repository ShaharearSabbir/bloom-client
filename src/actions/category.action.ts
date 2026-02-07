"use server";

import categoryService from "@/services/category.service";
import { Category } from "@/types/category";

export const createCategory = async (
  category: Omit<Category, "categoryId">,
) => {
  try {
    const result = await categoryService.createCategory(category);

    console.log(result);

    return { data: result, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to create category", error },
    };
  }
};

export const getCategories = async () => {
  try {
    const result = await categoryService.getCategories();
    return { data: result, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to get categories", error },
    };
  }
};
