"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
    Edit, 
    ExternalLink, 
    MoreVertical, 
    Trash 
} from "lucide-react";

import { Button } from "@/components/ui/button";

import RenameDocument from "./_functions/rename-docs";
import RemoveDocument from "./_functions/delete-docs";

import { Id } from "@/convex/_generated/dataModel";

interface DocumentMenuProps {
  documentId: Id<"document">;
  title: string;
}

const DocumentMenu = ({ documentId, title }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="p-0.5">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDocument documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Edit className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDocument>

        <RemoveDocument documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </RemoveDocument>
        <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/documents/${documentId}`, "_blank");
            }}
        >
          <ExternalLink className="size-4 mr-2" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
