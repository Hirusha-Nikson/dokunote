"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { AlignJustify } from "lucide-react";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatars } from "../[documents_Id]/avatars";
import { Inbox } from "../[documents_Id]/inbox";
import { cn } from "@/lib/utils";
import { DraggableToggleButton } from "@/components/draggable-trigger";

interface EditorHeaderProps {
  title: string;
  isOrganization: boolean
}

const EditorHeader = ({ title, isOrganization }: EditorHeaderProps) => {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <>
      {isMobile ? (
        <div className="flex min-w-full h-[64px] py-2 px-4 border-b bg-sidebar text-foreground border-b-[#E5E5E5] dark:border-[#222323] top-0 fixed z-50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 justify-between w-full pr-2">
              <SidebarTrigger className="opacity-80 hover:opacity-90" />
              {isOrganization && <Inbox />}
              <DraggableToggleButton/>
              </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-10 h-10 rounded-md opacity-80 hover:opacity-90"
                  >
                    <AlignJustify className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 ml-2 transition-all duration-300 ease-in-out"
                  forceMount={true}
                  side="top"
                  sideOffset={4}
                >
                  <DropdownMenuItem>
                    <Avatars />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  {isOrganization && <Inbox />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "fixed top-0 z-50 h-[64px] py-2 px-4 border-b bg-sidebar text-foreground border border-text-muted-foreground transition-all duration-300",
            state === "collapsed"
              ? "left-0 w-full"
              : "left-64 w-[calc(100%-16rem)]"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="opacity-80 hover:opacity-90" />
              <p className="text-md mr-2 font-semibold md:hidden lg:block">
                {title}
              </p>
              <Avatars />
            </div>
            <div className="flex items-center gap-4">

              {isOrganization && <Inbox />}
              
              <DraggableToggleButton/>
              <div className="w-8 overflow-hidden flex items-center scale-150 rounded-md">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl="/documents"
                  afterLeaveOrganizationUrl="/documents"
                  afterSelectOrganizationUrl="/documents"
                  afterSelectPersonalUrl="/documents"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorHeader;
