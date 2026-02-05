"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";


const AuthNav = () => {
  const user = auth.useSession().data?.user;
  const isMobile = useIsMobile()

  console.log(user);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size={isMobile ? "sm" : "default"} asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild size={isMobile ? "sm" : "default"}>
          <Link href="/register">Get started</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {/* If user.image exists, it shows; otherwise falls back to initials */}
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer w-full">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer w-full">
            Profile Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={async () => {
            await auth.signOut();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
