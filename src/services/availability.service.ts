import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const AvailabilityService = {
  async getByTutorId() {
    const cookiesStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/availabilities`, {
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) throw new Error("Failed to fetch availability");
    return response.json();
  },

  async syncSchedule(slots: any[]) {
    const cookiesStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/availabilities`, {
      method: "POST",
      headers: {
        Cookie: cookiesStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slots),
    });

    if (!response.ok) throw new Error("Failed to sync schedule");
    return response.json();
  },
};
