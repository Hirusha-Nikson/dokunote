"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FilePlus, Plus } from "lucide-react";
import CreateDocument from "../(routes)/documents/_components/_functions/create-docs";
import { Separator } from "@/components/ui/separator";

export function AppSidebarProject() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="-ml-2 flex items-center gap-2 overflow-x-hidden">
        <span>Application</span>
        <Separator orientation="horizontal"/>
        </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="">
          <SidebarMenuItem className="flex items-center justify-between">
            <div className="flex items-center">
            <FilePlus className="mr-2 size-4"/>
            <span>New Document</span>
            </div>
            <SidebarMenuAction className="size-6 flex top-0">
              <CreateDocument
                buttonText=""
                icon={Plus}
                className="ml-2"
              />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
