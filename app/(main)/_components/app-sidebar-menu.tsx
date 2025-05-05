"use client";

import { SidebarContent } from "@/components/ui/sidebar";
import { AppSidebarProject } from "./app-sidebar-projects";
import AppSidebarDocumentList from "./app-sidebar-documetlist";
import AppSidebarTools from "./app-sidebar-tools";
import AppSidebarHome from "./app-sidebar-home";

const AppSidebarMenu = () => {
    return (
        <SidebarContent className="mx-1.5">
            <AppSidebarHome />
            <AppSidebarProject />
            <AppSidebarDocumentList />
            <AppSidebarTools />
        </SidebarContent>
    );
}

export default AppSidebarMenu;