"use server";

import { bookingService } from "@/services/booking.service";
import { ActionResponse } from "@/types/action.type";
import { Booking } from "@/types/bookings.type";
import { revalidatePath } from "next/cache";

export const createBooking = async (
  bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">[],
): Promise<ActionResponse<Booking[]>> => {
  try {
    console.log("bookingData from action:", bookingData);

    const result = await bookingService.createBookingAction(bookingData);

    if (result.success) {
      revalidatePath("/dashboard/bookings");
      revalidatePath("/tutors");
      revalidatePath("/tutors/[id]");
      return { data: result.data, error: null };
    }

    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to create booking", error },
    };
  }
};

export const getUserBookings = async (
  page: number,
  limit: number,
): Promise<ActionResponse<Booking[]>> => {
  try {
    const result = await bookingService.getUserBookings(page, limit);
    if (result.success) {
      return { data: result.data, meta: result.meta, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to get user bookings", error },
    };
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  newStatus: string,
): Promise<ActionResponse<Booking>> => {
  try {
    const result = await bookingService.updateBookingStatus(
      bookingId,
      newStatus,
    );

    if (result.success) {
      revalidatePath("/dashboard/bookings");
      revalidatePath("/tutor-dashboard/bookings");
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return {
      data: null,
      error: { message: "Failed to update booking status", error },
    };
  }
};

export const joinSession = async (
  bookingId: string,
): Promise<ActionResponse<Booking>> => {
  try {
    const result = await bookingService.joinSession(bookingId);
    if (result.success) {
      return { data: result.data, error: null };
    }
    return { data: null, error: { message: result.message } };
  } catch (error) {
    return { data: null, error: { message: "Failed to join session", error } };
  }
};
