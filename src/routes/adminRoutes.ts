import { NavItem } from "@/app/(dashboardLayout)/layout";
import { LayoutDashboard } from "lucide-react";

const adminRouteItems: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "admin-dashboard",
    isActive: true,
  },
  {
    label: "Users",
    icon: LayoutDashboard,
    href: "admin-dashboard/users",
  },
];


export default adminRouteItems