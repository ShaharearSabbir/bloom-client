import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import logo from "@/assets/logo.png";

import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";
import { Blob } from "buffer";
import userServices from "@/services/user.service";
import { UserRole } from "@/types/userRole";
import adminRouteItems from "@/routes/adminRoutes";
import tutorRouteItems from "@/routes/tutorRoutes";
import studentRouteItems from "@/routes/studentRoutes";
import { DynamicBreadcrumbs } from "@/components/modules/dashboard/DynamicBreadcrumb";

export type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  logo: {
    src: StaticImageData;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

const res = await userServices.getSession();
const user = res.data.user;

const sidebarData: SidebarData = {
  logo: {
    src: logo,
    alt: "Bloom Logo",
    title: "Bloom",
    description: "Sharing Knowledge with Bloom",
  },
  navGroups: [
    {
      title: "Main Menu",
      items:
        user.role === UserRole.ADMIN
          ? adminRouteItems
          : user.role === UserRole.TUTOR
            ? tutorRouteItems
            : studentRouteItems,
    },
  ],
  footerGroup: {
    title: "Support",
    items: [
      { label: "Help Center", icon: HelpCircle, href: "#" },
      { label: "Settings", icon: Settings, href: "#" },
    ],
  },
};

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              className="size-6 text-primary-foreground invert dark:invert-0"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo logo={sidebarData.logo} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.href}>{item.label}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>{item.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

interface Sidebar1Props {
  className?: string;
  admin?: React.ReactNode;
  student?: React.ReactNode;
  tutor?: React.ReactNode;
}

const DashboardLayout = ({
  className,
  admin,
  student,
  tutor,
}: Sidebar1Props) => {
  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DynamicBreadcrumbs />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {admin}
          {student}
          {tutor}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
