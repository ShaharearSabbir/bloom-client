"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavItem } from "@/types/NavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardItem = ({ item }: { item: Omit<NavItem, "icon"> }) => {
  const pathname = usePathname();

  item.isActive = pathname === item.href;

  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton asChild isActive={item.isActive}>
        <Link href={item.href}>{item.label}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default DashboardItem;
