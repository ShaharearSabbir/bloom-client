import { Booking } from "@/types/bookings.type";
import { ServiceResponse } from "@/types/service.tye";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const bookingService = {
  createBookingAction: async (
    bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">[],
  ): Promise<ServiceResponse<Booking[]>> => {
    const cookieStore = await cookies();

    const allCookies = cookieStore.toString();

    console.log("bookingData from service:", bookingData);

    const response = await fetch(`${BACKEND_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify(bookingData),
    });

    console.log("response from service:", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    return response.json();
  },

  getUserBookings: async (
    page: number,
    limit: number,
  ): Promise<ServiceResponse<Booking[]>> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const response = await fetch(
      `${BACKEND_URL}/api/bookings/my-bookings?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
      },
    );
    return response.json();
  },

  updateBookingStatus: async (
    bookingId: string,
    newStatus: string,
  ): Promise<ServiceResponse<Booking>> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const response = await fetch(
      `${BACKEND_URL}/api/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );
    return response.json();
  },

  joinSession: async (bookingId: string): Promise<ServiceResponse<Booking>> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const response = await fetch(
      `${BACKEND_URL}/api/bookings/${bookingId}/join-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
      },
    );
    return response.json();
  },
};
