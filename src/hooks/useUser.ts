import { auth } from "@/lib/auth-client";

export const useUser = () => auth.useSession().data?.user;
