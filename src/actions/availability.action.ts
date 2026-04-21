"use server";

import { AvailabilityService } from "@/services/availability.service";
import { ActionResponse } from "@/types/action.type";
import { Availability } from "@/types/availability.type";
import { revalidatePath } from "next/cache";

export async function getMyAvailabilityAction(): Promise<
  ActionResponse<Availability[]>
> {
  try {
    const result = await AvailabilityService.getServices();
    if (!result.success) {
      return { data: null, error: { message: result.message } };
    }

    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Could not load schedule" } };
  }
}

export async function syncAvailabilityAction(
  slots: any[],
): Promise<ActionResponse<Availability[]>> {
  try {
    const result = await AvailabilityService.syncSchedule(slots);

    if (!result.success) {
      return { data: null, error: { message: result.message } };
    }

    revalidatePath("/dashboard/availability");
    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Could not save schedule" } };
  }
}
