"use server";

import tutorService from "@/services/tutor.service";
import { ActionResponse } from "@/types/action.type";
import { FilterData, Tutor } from "@/types/tutor.type";
import {
  TutorSearchParams,
  tutorSearchSchema,
} from "@/validation/tutors.validation";

export const createTutor = async (
  tutor: Omit<Tutor, "tutorId">,
): Promise<ActionResponse<Tutor>> => {
  try {
    const result = await tutorService.createTutor(tutor);

    if (result.success) {
      return { data: result.data, error: null };
    }
    return {
      data: null,
      error: { message: result.message },
    };
  } catch (error) {
    return { data: null, error: { message: "Failed to create tutor", error } };
  }
};

export const updateTutor = async (
  tutor: Partial<Tutor>,
): Promise<ActionResponse<Tutor>> => {
  try {
    const result = await tutorService.updateTutor(tutor);

    if (result.success) {
      return { data: result.data, error: null };
    }
    return {
      data: null,
      error: { message: result.message },
    };
  } catch (error) {
    return { data: null, error: { message: "Failed to update tutor", error } };
  }
};

export const getMyTutor = async (): Promise<ActionResponse<Tutor>> => {
  try {
    const result = await tutorService.getMyTutor();

    if (result.success) {
      return { data: result.data, error: null };
    }

    return {
      data: null,
      error: { message: result.message },
    };
  } catch (error) {
    return { data: null, error: { message: "Failed to get my tutor", error } };
  }
};

export const getTutorDetails = async (
  id: string,
): Promise<ActionResponse<Tutor>> => {
  try {
    const result = await tutorService.getTutorDetails(id);

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
      error: { message: "Failed to get tutor details", error },
    };
  }
};

export const getTutors = async (searchParams: TutorSearchParams) => {
  try {
    const validatedParams = tutorSearchSchema.safeParse(searchParams);

    if (!validatedParams.success) {
      return {
        data: null,
        error: {
          message: "Invalid search parameters",
          error: validatedParams.error,
        },
      };
    }

    searchParams = validatedParams.data;

    const result = await tutorService.getTutors(searchParams);

    if (result.success) {
      return { data: { tutors: result.data, meta: result.meta }, error: null };
    }

    return {
      data: null,
      error: { message: result.message },
    };
  } catch (error) {
    return { data: null, error: { message: "Failed to get tutors", error } };
  }
};

export const getFilterData = async (): Promise<ActionResponse<FilterData>> => {
  try {
    const result = await tutorService.getFilterData();

    if (result.success) {
      return { data: result.data, error: null };
    }

    return {
      data: null,
      error: {
        message: result.message,
      },
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to get filter data",
        error,
      },
    };
  }
};
