"use client";
import { Sidebar  } from "@/components/ui/sidebar";


export function AppSidebar({
    children,
} : {
    children: React.ReactNode}) {
  return (
    <Sidebar>
      
        {children}
      
    </Sidebar>
  );
}
