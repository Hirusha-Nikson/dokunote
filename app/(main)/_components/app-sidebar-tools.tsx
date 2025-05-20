"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Bot, Link, PencilLine, Replace } from "lucide-react";

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
    routes.push(`/documents/${params.documents_Id}/notes`);
  };

  const handleCitesClick = () => {
    routes.push(`/documents/${params.documents_Id}/citations`);
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
              <span className="text-sm">Notes</span>
            </SidebarMenuButton>

            <LinksDialogScreen>
            <SidebarMenuButton className="flex items-center">
              <Link className="size-4" />
              <span className="text-sm">Quick Links</span>
            </SidebarMenuButton>
            </LinksDialogScreen>

            <SidebarMenuButton className="flex items-center" onClick={() => {handleCitesClick()}}>
              <Replace className="size-4" />
              <span className="text-sm">Citations</span>
            </SidebarMenuButton>

            {/* <SidebarMenuButton className="flex items-center">
              <Users2 className="size-4" />
              <span className="text-sm">Assign Task</span>
            </SidebarMenuButton> */}

            <SidebarMenuButton
            onClick={handlePDFclick}
            className="flex items-center"
            >
              <Bot className="size-4" />
              <span className="text-sm">PDF Summarizer</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AppSidebarTools;
