import { NavItem } from "@/types/NavItem";
import { LayoutDashboard } from "lucide-react";

const studentRouteItems: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard/overview",
  },
  {
    label: "My Bookings",
    icon: LayoutDashboard,
    href: "/dashboard/bookings",
  },
];

export default studentRouteItems;
