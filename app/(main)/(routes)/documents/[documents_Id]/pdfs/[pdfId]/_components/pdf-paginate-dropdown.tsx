"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

interface PdfPaginateDropdownProps {
  fileId : string
  documentId : Id<"document">
}
export const PdfPaginateDropdown = ({fileId, documentId}: PdfPaginateDropdownProps) => {

  const handleDelete = useMutation(api.pdfstore.deletePdfFile);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="absolute top-2 right-2 opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-200 ease-in-out"
          aria-label="Open menu"
        >
          <MoreVertical className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          Download
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          Share
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
          onClick={
            (e) => {e.stopPropagation();
              handleDelete({ documentId, fileId })
              .then(() => {
                toast.success("Note deleted successfully");
              })
              .catch(() => {
                toast.error("Something went wrong !");
              })
            }
            
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
