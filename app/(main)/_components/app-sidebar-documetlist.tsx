"use client";
import { useRouter } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ChevronRight } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

const AppSidebarDocumentList = () => {
  const router = useRouter();

  const userDocs = useQuery(api.documents.getDocumentsByUser);
  const orgDocs = useQuery(api.documents.getDocumentsByOrganization);

  const { organization } = useOrganization();

  // Ensure documentsToShow is always an array
  const documentsToShow = organization ? orgDocs || [] : userDocs || [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="-ml-2 gap-2 overflow-x-hidden">
        Documents
        <Separator orientation="horizontal" />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible asChild className="group/collapsible" defaultOpen={true}>
            <SidebarMenuItem className="-ml-2">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="group/personal">
                  <BookOpen className="size-4 group-hover/personal:stroke-sky-500" />
                  <span>Documents</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {Array.isArray(documentsToShow) && documentsToShow.length > 0 ? (
                    documentsToShow.map((doc) => (
                      <SidebarMenuButton
                        key={doc._id} // Ensure key is unique and stable
                        onClick={() => router.push(`/documents/${doc._id}`)}
                      >
                        {doc.title}
                      </SidebarMenuButton>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <span className="text-xs text-center opacity-60">
                        No document found
                      </span>
                    </SidebarMenuItem>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AppSidebarDocumentList;
