"use client";

import Image from "next/image";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import DokunoteLogo from "@/components/assets/Asset 2.png";

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="mx-0">
      <SidebarMenu className="w-full">
        <SidebarMenuButton
          asChild
          className="overflow-hidden w-full items-center"
        >
          <div className="flex justify-between h-14 w-full items-center">
            <div className="flex items-center">
              <div className="flex space-x-2 items-end">
                <div className="flex items-center justify-center w-8 h-8 rounded-md">
                  <Image
                    src={DokunoteLogo}
                    alt="Dokunote"
                    className="size-8 mix-blend-difference m-1"
                  />
                </div>
                <div className="flex flex-col -space-y-2">
                  <span className="text-md font-semibold">Dokunote</span>
                  <span className="text-sm">workspace</span>
                </div>
              </div>
            </div>
            {/* <div
              role="button"
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {window.location.href = "/documents"}}
            >
              <Home className="size-4 opacity-70 hover:opacity-100" />
            </div> */}
          </div>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
