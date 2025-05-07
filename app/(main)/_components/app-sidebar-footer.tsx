"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserButton, useUser } from "@clerk/nextjs";

import { Settings2 } from "lucide-react";


const AppSidebarFooter = () => {
  const user = useUser();

  const { isMobile } = useSidebar()


  return (
    <SidebarFooter>
      <SidebarMenu>
        <DropdownMenu> 
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Settings2 className="size-4" />
                <span className="text-sm">Settings</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
          align="end" 
          className="w-80 ml-2"
          side={isMobile ? "bottom" : "right"}
          sideOffset={4}
          >
            <DropdownMenuItem 
               onSelect={(e) => e.preventDefault()}
               className="pointer-events-auto"
            >
              <div className="flex items-center justify-between w-full gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Appearance</span>
                <span className="text-xs font-light">Change between light and dark themes or leave it as your system theme</span>
              </div>
              <div>
                <ModeToggle />
              </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarMenuButton asChild className="overflow-hidden">
            <div className="flex justify-between h-14 w-full items-center">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
                <span className="text-sm font-medium">{user.user?.fullName}</span>
                <span className="text-xs font-medium truncate opacity-75 w-32">{user.user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
          </div>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;