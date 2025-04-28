"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Bot, Link, PencilLine, Replace, Users2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { LinksDialogScreen } from "@/components/links-dialog";


const AppSidebarTools = () => {
  const params = useParams();
  const routes = useRouter();

  const handlePDFclick = () => {
    routes.push(`/documents/${params.documents_Id}/pdfs`);
  };

  const handleNotesClick = () => {
    window.open(`/documents/${params.documents_Id}/notes`, "_blank");
  };


  return (
    <SidebarGroup>
      <SidebarGroupLabel className="-ml-2 gap-2 overflow-x-hidden">
        Tools
        <Separator orientation="horizontal" />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="">
          <SidebarMenuItem className="-ml-2">
            <SidebarMenuButton
              onClick={() => {handleNotesClick()}}
              className="flex items-center"
            >
              <PencilLine className="size-4" />
              <span className="text-sm">Quick Notes</span>
            </SidebarMenuButton>

            <LinksDialogScreen>
            <SidebarMenuButton className="flex items-center">
              <Link className="size-4" />
              <span className="text-sm">Quick Links</span>
            </SidebarMenuButton>
            </LinksDialogScreen>

            <SidebarMenuButton className="flex items-center">
              <Replace className="size-4" />
              <span className="text-sm">Bibliography</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="flex items-center">
              <Users2 className="size-4" />
              <span className="text-sm">Assign Task</span>
            </SidebarMenuButton>

            <SidebarMenuButton
            onClick={handlePDFclick}
            className="flex items-center"
            >
              <Bot className="size-4" />
              <span className="text-sm">Ai PDF</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AppSidebarTools;
