"use server";

import studentService from "@/services/student.service";
import { ActionResponse } from "@/types/action.type";
import { Student, StudentStats } from "@/types/student.type";
import { revalidatePath } from "next/cache";

export const getProfile = async (): Promise<ActionResponse<Student>> => {
  try {
    const result = await studentService.getProfile();
    if (result.success) {
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return { data: null, error: { message: "Failed to get profile", error } };
  }
};

export const getStudentStats = async (): Promise<
  ActionResponse<StudentStats>
> => {
  try {
    const result = await studentService.getStudentStats();
    if (result.success) {
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to get student stats", error },
    };
  }
};

export const updateProfile = async (
  payload: Partial<Student>,
): Promise<ActionResponse<Student>> => {
  try {
    const result = await studentService.updateProfile(payload);
    if (result.success) {
      revalidatePath("/dashboard/profile");
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to update profile", error },
    };
  }
};
