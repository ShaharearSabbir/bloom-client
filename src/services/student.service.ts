import { ServiceResponse } from "@/types/service.tye";
import { Student, StudentStats } from "@/types/student.type";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

const studentService = {
  getProfile: async (): Promise<ServiceResponse<Student>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    const res = await fetch(`${BACKEND_URL}/api/students/my-profile`, {
      method: "GET",
      headers: {
        Cookie: allCookies,
      },
    });
    return await res.json();
  },

  getStudentStats: async (): Promise<ServiceResponse<StudentStats>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    const res = await fetch(`${BACKEND_URL}/api/students/stats`, {
      method: "GET",
      headers: {
        Cookie: allCookies,
      },
    });
    return await res.json();
  },

  updateProfile: async (
    payload: Partial<Student>,
  ): Promise<ServiceResponse<Student>> => {
    const cookiesStore = await cookies();
    const allCookies = cookiesStore.toString();

    const res = await fetch(`${BACKEND_URL}/api/students/my-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  },
};

export default studentService;
