import { NavItem } from "@/app/(dashboardLayout)/layout";
import { LayoutDashboard } from "lucide-react";

const studentRouteItems: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "admin-dashboard",
    isActive: true,
  },
  {
    label: "My Bookings",
    icon: LayoutDashboard,
    href: "dashboard/bookings",
  },
];

export default studentRouteItems;
