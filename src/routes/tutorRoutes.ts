import { NavItem } from "@/app/(dashboardLayout)/layout";
import {
  LayoutDashboard,
  CalendarClock,
  BookOpenCheck,
  UserCog,
  WalletCards,
  Star,
} from "lucide-react";

const tutorRouteItems: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/tutor-dashboard",
    isActive: true,
  },
  {
    label: "Availability",
    icon: CalendarClock,
    href: "/tutor-dashboard/availability",
  },
  {
    label: "My Sessions",
    icon: BookOpenCheck,
    href: "/tutor-dashboard/bookings",
  },
  {
    label: "Earnings",
    icon: WalletCards,
    href: "/tutor-dashboard/earnings",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/tutor-dashboard/reviews",
  },
  {
    label: "Tutor Profile",
    icon: UserCog,
    href: "/tutor-dashboard/profile",
  },
];

export default tutorRouteItems;
