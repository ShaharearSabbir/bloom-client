"use server";

import reviewService from "@/services/review.service";
import { ActionResponse } from "@/types/action.type";
import { Review } from "@/types/review.type";
import { revalidatePath } from "next/cache";

export const addReviewAction = async (
  formData: FormData,
  tutorId: string,
  rating: number,
): Promise<ActionResponse<Review>> => {
  try {
    const payload = {
      tutorId,
      rating,
      comment: formData.get("comment") as string,
    };

    const result = await reviewService.addReview(payload);

    if (!result.success) {
      return { data: null, error: { message: result.message } };
    }

    revalidatePath(`/tutors/${tutorId}`);
    revalidatePath(`/tutor-dashboard/reviews`);

    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Failed to add review", error } };
  }
};
