"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Logout = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      className={className && className}
      onClick={() =>
        auth.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              router.refresh();
            },
          },
        })
      }
    >
      Logout
    </Button>
  );
};

export default Logout;
