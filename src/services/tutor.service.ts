import { Tutor } from "@/types/tutor";

const tutorService = {
  getTutors: async () => {
    const tutors = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "GET",
    });
    return await tutors.json();
  },

  getMyTutor: async () => {
    const tutors = await fetch(
      `${process.env.BACKEND_URL}/api/tutors/my-profile`,
      {
        method: "GET",
      },
    );
    return await tutors.json();
  },

  createTutor: async (tutor: Partial<Tutor>) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutor),
    });
    return await res.json();
  },

  updateTutor: async (tutor: Partial<Tutor>) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tutors`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutor),
    });
    return await res.json();
  },
};

export default tutorService;
