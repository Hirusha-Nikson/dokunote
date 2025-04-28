"use client";

import { ReactNode } from "react";

import { AppSidebar } from "@/app/(main)/_components/app-sidebar";
import AppSidebarHeader from "@/app/(main)/_components/app-sidebar-header";
import AppSidebarMenu from "@/app/(main)/_components/app-sidebar-menu";
import AppSidebarFooter from "@/app/(main)/_components/app-sidebar-footer";
import { SidebarProvider } from "@/components/ui/sidebar"

const DocumentsLayout = ({ children }: { children: ReactNode }) => {
    return ( 
        <SidebarProvider defaultOpen={true} >
    <AppSidebar>
        <AppSidebarHeader />
        <AppSidebarMenu />
        <AppSidebarFooter />
      </AppSidebar>
      <div className="mx-auto w-full">
        {children}
      </div>
  </SidebarProvider>
     );
}
 
export default DocumentsLayout;