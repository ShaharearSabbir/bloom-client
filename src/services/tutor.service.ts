import { getTutorDetails } from "@/actions/tutor.Action";
import { ServiceResponse } from "@/types/service.tye";
import { FilterData, Tutor } from "@/types/tutor.type";
import { TutorSearchParams } from "@/validation/tutors.validation";
import { cookies } from "next/headers";

const tutorService = {
  getTutors: async (
    searchParams: TutorSearchParams,
  ): Promise<ServiceResponse<Tutor[]>> => {
    const tutors = await fetch(
      `${process.env.BACKEND_URL}/api/tutors?${new URLSearchParams(searchParams as Record<string, string>).toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await tutors.json();
  },
  getFeaturedTutors: async (): Promise<ServiceResponse<Tutor[]>> => {
    const tutors = await fetch(
      `${process.env.BACKEND_URL}/api/tutors/featured-tutors`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await tutors.json();
  },

  getMyTutor: async (): Promise<ServiceResponse<Tutor>> => {
    const cookiesStore = await cookies();
    const tutors = await fetch(
      `${process.env.BACKEND_URL}/api/tutors/my-profile`,
      {
        method: "GET",
        headers: {
          Cookie: cookiesStore.toString(),
        },
      },
    );

    return await tutors.json();
  },

  createTutor: async (
    tutor: Omit<Tutor, "tutorId">,
  ): Promise<ServiceResponse<Tutor>> => {
    const cookiesStore = await cookies();
    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
      },
      body: JSON.stringify(tutor),
    });

    return await res.json();
  },

  updateTutor: async (
    tutor: Partial<Tutor>,
  ): Promise<ServiceResponse<Tutor>> => {
    const cookiesStore = await cookies();

    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
      },
      body: JSON.stringify(tutor),
    });
    return await res.json();
  },

  getMyTutorProfile: async (): Promise<ServiceResponse<Tutor>> => {
    const cookiesStore = await cookies();
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/tutors/my-profile`,
      {
        method: "GET",
        headers: {
          Cookie: cookiesStore.toString(),
        },
      },
    );
    return await res.json();
  },

  getTutorDetails: async (id: string): Promise<ServiceResponse<Tutor>> => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  getFilterData: async (): Promise<ServiceResponse<FilterData>> => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/filter`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  },
};

export default tutorService;
