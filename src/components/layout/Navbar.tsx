// src/components/modules/Navbar.tsx
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import AuthNav from "./AuthNav";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo - Shrinks if needed but doesn't overlap */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={logo}
              alt="logo"
              width={32}
              height={32}
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <h3 className="text-xl lg:text-3xl font-semibold tracking-tighter">
              Bloom
            </h3>
          </Link>

          {/* Desktop Navigation - Middle */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/tutors"
                  className={navigationMenuTriggerStyle()}
                >
                  Tutors
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={navigationMenuTriggerStyle()}
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop-only: Theme Toggle */}
            <div className="hidden lg:block">
              <ModeToggle />
            </div>

            {/* AuthNav: logic inside handles mobile vs desktop */}
            <AuthNav />

            {/* Mobile Burger Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden shrink-0"
                >
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image src={logo} alt="logo" width={28} height={28} />
                    <span>Bloom</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium">
                    Home
                  </Link>
                  <Link href="/tutors" className="text-lg font-medium">
                    Tutors
                  </Link>
                  <Link href="/about" className="text-lg font-medium">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Contact Us
                  </Link>

                  {/* For Mobile: Show Auth Links inside menu if logged out */}
                  {/* This part is handled by putting AuthNav logic or clones here if needed */}
                </div>
                <div className="mt-auto border-t pt-4 flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
