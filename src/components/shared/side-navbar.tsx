"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function SideNavbar() {
  const user = { name: "Farhad Sir", role: "Administrator" };
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* side bar header */}
      <SidebarHeader className="border-b">
        <Link href="/">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="font-bold">P</span>
            </div>
            <div className="font-semibold">ParentNestly</div>
          </div>
        </Link>
      </SidebarHeader>

      {/* side bar content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link href="/admin/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard/blogs"}
                  tooltip="Blogs"
                >
                  <Link href={"/admin/dashboard/blogs"}>
                    {/* blogs icon */}
                    <Blocks className="h-4 w-4" />
                    <span>Blogs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard/categories"}
                  tooltip="Categories"
                >
                  <Link href={"/admin/dashboard/categories"}>
                    {/* categories icon */}
                    <Blocks className="h-4 w-4" />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* side bar footer */}
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
              {user?.name?.charAt(0) || "F"}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      {/* side bar rail */}
      <SidebarRail />
    </Sidebar>
  );
}
