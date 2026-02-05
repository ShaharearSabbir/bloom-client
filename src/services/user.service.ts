import { cookies } from "next/headers";

const userServices = {
  getSelection: async () => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/auth/get-session`,
        {
          headers: {
            Cookie: cookiesStore.toString(),
          },
        },
      );

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "session not found", error } };
    }
  },
};

export default userServices;

export type UserServices = typeof userServices;
