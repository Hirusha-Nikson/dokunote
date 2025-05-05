"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home } from "lucide-react";

const AppSidebarHome = () => {
    return (
        <div>
    <SidebarGroup>
      <SidebarGroupLabel className="-ml-2 gap-2 overflow-x-hidden">
        Link
        <Separator orientation="horizontal" />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="">
          <SidebarMenuItem className="-ml-2">
            <SidebarMenuButton
              onClick={() => {window.location.href = "/documents"}}
              className="flex items-center"
            >
              <Home className="size-4" />
              <span className="text-sm">Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    <SidebarMenu>
    </SidebarMenu>
  </div>
     );
}
 
export default AppSidebarHome;