"use server";

import tutorService from "@/services/tutor.service";
import { Tutor } from "@/types/tutor";

export const createTutor = async (tutor: Omit<Tutor, "tutorId">) => {
  try {
    const result = await tutorService.createTutor(tutor);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: { message: "Failed to create tutor", error } };
  }
};

export const updateTutor = async (tutor: Partial<Tutor>) => {
  try {
    const result = await tutorService.updateTutor(tutor);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: { message: "Failed to update tutor", error } };
  }
};
