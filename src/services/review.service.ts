import { Review, TutorReview } from "@/types/review.type";
import { ServiceResponse } from "@/types/service.tye";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

const reviewService = {
  addReview: async (
    payload: Omit<
      Review,
      "id" | "createdAt" | "updatedAt" | "status" | "studentId"
    >,
  ): Promise<ServiceResponse<Review>> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const response = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  },

  getTutorReviews: async (): Promise<ServiceResponse<TutorReview>> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const response = await fetch(
      `${BACKEND_URL}/api/reviews/my-tutor-reviews`,
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
};

export default reviewService;
