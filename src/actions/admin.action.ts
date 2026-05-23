"use server";

import adminServices from "@/services/admin.service";
import { ActionResponse } from "@/types/action.type";
import { Booking, User, UserStatus } from "@/types/admin.type";
import { revalidatePath } from "next/cache";

export interface GetAllUserPayload {
  page: number;
  limit: number;
  search: string;
}

export const getAllUsers = async (
  payload: GetAllUserPayload,
): Promise<ActionResponse<User[]>> => {
  try {
    const result = await adminServices.getAllUser(payload);

    console.log(result);

    if (result.success) {
      return { data: result.data, meta: result.meta, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return { data: null, error: { message: "Failed to get users", error } };
  }
};
export const getAllBookings = async (
  payload: GetAllUserPayload,
): Promise<ActionResponse<Booking[]>> => {
  try {
    const result = await adminServices.getAllBookings(payload);

    console.log(result);

    if (result.success) {
      return { data: result.data, meta: result.meta, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return { data: null, error: { message: "Failed to get users", error } };
  }
};

export const updateUserStatus = async (
  userId: string,
  status: UserStatus,
): Promise<ActionResponse<undefined>> => {
  try {
    const result = await adminServices.updateUserStatus(userId, status);

    if (result.success) {
      revalidatePath("/admin-dashboard/users");
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to update user status", error },
    };
  }
};

export const updateUserStatusAction = async () => {};
