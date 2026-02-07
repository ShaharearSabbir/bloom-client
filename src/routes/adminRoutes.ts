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
  {
    label: "Create Category",
    icon: LayoutDashboard,
    href: "admin-dashboard/create-category",
  },
];

export default adminRouteItems;
