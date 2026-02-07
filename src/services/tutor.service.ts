import { Tutor } from "@/types/tutor";
import { get } from "http";
import { cookies } from "next/headers";

const tutorService = {
  getTutors: async () => {
    const tutors = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "GET",
    });
    return await tutors.json();
  },

  getMyTutor: async () => {
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

  createTutor: async (tutor: Omit<Tutor, "tutorId">) => {
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

  updateTutor: async (tutor: Partial<Tutor>) => {
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

  getMyTutorProfile: async () => {
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
};

export default tutorService;
