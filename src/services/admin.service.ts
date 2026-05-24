import { GetAllUserPayload } from "@/actions/admin.action";
import { AdminStats, Booking, User, UserStatus } from "@/types/admin.type";
import { ServiceResponse } from "@/types/service.tye";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

const adminServices = {
  getAllUser: async (
    payload: GetAllUserPayload,
  ): Promise<ServiceResponse<User[]>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    console.log(payload);

    const res = await fetch(
      `${BACKEND_URL}/api/admin/users?limit=${payload.limit}&page=${payload.page}${payload.search ? `&search=${payload.search}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
      },
    );

    return await res.json();
  },
  getAllBookings: async (
    payload: GetAllUserPayload,
  ): Promise<ServiceResponse<Booking[]>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    console.log(payload);

    const res = await fetch(
      `${BACKEND_URL}/api/admin/bookings?limit=${payload.limit}&page=${payload.page}${payload.search ? `&search=${payload.search}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
      },
    );

    return await res.json();
  },
  getAdminStats: async (): Promise<ServiceResponse<AdminStats>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
    });

    return await res.json();
  },

  updateUserStatus: async (
    userId: string,
    status: UserStatus,
  ): Promise<ServiceResponse<undefined>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();
    const user = await fetch(
      `${BACKEND_URL}/api/admin/users/${userId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        body: JSON.stringify({ status }),
      },
    );

    return await user.json();
  },
};

export default adminServices;
