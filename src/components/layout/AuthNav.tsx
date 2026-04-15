// src/components/modules/AuthNav.tsx
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
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
import { cn } from "@/lib/utils";

const AuthNav = () => {
  const user = auth.useSession().data?.user;
  const isMobile = useIsMobile();

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 lg:gap-2">
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          asChild
          className={cn(isMobile && "px-2 h-8 text-xs")}
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          asChild
          size={isMobile ? "sm" : "default"}
          className={cn(isMobile && "px-3 h-8 text-xs")}
        >
          <Link href="/register">Get started</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full select-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-9 w-9 lg:h-10 border border-border">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-foreground">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">Profile Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
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
