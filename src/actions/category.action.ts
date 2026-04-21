"use server";

import categoryService from "@/services/category.service";
import { ActionResponse } from "@/types/action.type";
import { Category } from "@/types/category.type";

export const createCategory = async (
  category: Omit<Category, "categoryId">,
): Promise<ActionResponse<Category>> => {
  try {
    const result = await categoryService.createCategory(category);

    if (result.success) {
      return { data: result.data, error: null };
    }

    return {
      data: null,
      error: { message: result.message },
    };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to create category", error },
    };
  }
};

export const getCategories = async (): Promise<ActionResponse<Category[]>> => {
  try {
    const result = await categoryService.getCategories();
    if (!result.success) {
      return {
        data: null,
        error: { message: result.message },
      };
    }

    return { data: result.data, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to get categories", error },
    };
  }
};
