"use client";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { useUser } from "@clerk/nextjs";

import { SidebarTrigger } from "@/components/ui/sidebar";


interface SubHeaderProps {
    pageTitle: string;
}

const SubHeader = ({pageTitle}:SubHeaderProps) => {
    const params = useParams();
      const documents_Id = params?.documents_Id;

      const user = useUser();

      const documents = useQuery(api.documents.getById, { id: documents_Id as Id<"document"> });

      if (!user || !documents) {
        return null;
      }
    return (
        <div className="flex min-w-full h-[64px] py-2 px-4 border-b bg-sidebar text-foreground border-[#E5E5E5] dark:border-[#222323] top-0 fixed z-50">
        <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
        {/* <Button 
        variant={"ghost"}
        className="opacity-80 hover:opacity-90"
        onClick={() => window.history.back()}
        >
        <ChevronLeft className="w-5 h-5 opacity-80 hover:opacity-90" />
        </Button> */}
        <SidebarTrigger />
        <div className="flex items-baseline gap-2">
          <p className="text-xl mr-2 font-semibold">{pageTitle}</p>
          <p className="text-sm font-medium text-muted-foreground">{"/ "}{documents.title}</p>
        </div>
        </div>
        <div className="flex items-center gap-4">

          <div className="w-8 overflow-hidden flex items-center scale-150 rounded-md">
          </div>
        </div>
      </div>
      </div>
     );
}
 
export default SubHeader;