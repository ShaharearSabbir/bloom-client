import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import AuthNav from "./AuthNav";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface Navbar5Props {
  className?: string;
}

const Navbar = ({ className }: Navbar5Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link
            href="https://www.shadcnblocks.com"
            className="flex items-center justify-center gap-2"
          >
            <Image src={logo} alt="logo" width={40} height={40} />
            <h3 className="text-3xl font-semibold tracking-tighter">Bloom</h3>
          </Link>
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
          <div className="hidden items-center gap-4 lg:flex">
            <AuthNav />
            <ModeToggle />
          </div>
          <Sheet>
            <div className="flex items-center gap-2">
              <div className="lg:hidden">
                <AuthNav />
              </div>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="logo" width={40} height={40} />
                    <span className="text-lg font-semibold tracking-tighter">
                      Bloom
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <Link href="/home" className="font-medium">
                    Home
                  </Link>
                  <Link href="/tutors" className="font-medium">
                    Tutors
                  </Link>
                  <Link href="about" className="font-medium">
                    About Us
                  </Link>
                  <Link href="contact" className="font-medium">
                    Contact Us
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
