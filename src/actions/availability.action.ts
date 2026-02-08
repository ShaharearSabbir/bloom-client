"use server";

import { AvailabilityService } from "@/services/availability.service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getMyAvailabilityAction() {
  try {
    const result = await AvailabilityService.getByTutorId();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Could not load schedule" };
  }
}

export async function syncAvailabilityAction(slots: any[]) {
  try {
    const result = await AvailabilityService.syncSchedule(slots);

    revalidatePath("/dashboard/availability");
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Could not save schedule" };
  }
}
