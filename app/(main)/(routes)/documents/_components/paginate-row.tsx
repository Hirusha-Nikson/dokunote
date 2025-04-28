"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { 
    TableCell, 
    TableRow 
} from "@/components/ui/table";

import { 
    Building2, 
    CircleUser, 
    File, 
} from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";

import DocumentMenu from "./paginate-menu";

interface DocumentTableRowProps {
  document: Doc<"document">;
}

const DocumentTableRow = ({ document }: DocumentTableRowProps) => {
  const user = useUser();
  const router = useRouter();

  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`);
  }

  return (
    <TableRow 
    onClick={() => onRowClick(document._id)}
    className="cursor-pointer border-b border-text-muted-foreground">
      <TableCell className="flex items-center gap-2">
        <File className="size-4 hidden md:block stroke-sky-600" />
        {document.title}
      </TableCell>

      <TableCell className="hidden sm:table-cell">{""}</TableCell>

      <TableCell className="items-center space-x-2">
        {document?.organizationId ? (
          <div className="flex items-center space-x-2">
            <Building2 className="size-4" />
            <p className="text-xs flex items-center gap-1">
              Organization
              <span className="hidden sm:flex text-xs opacity-70">
                /&nbsp;
                {document.ownerId === user?.user?.id ? (
                    "you"
                ) : (
                    "member"
                )}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CircleUser className="size-4" />
            <p className="text-xs">Personal</p>
          </div>
        )}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(document._creationTime),"MMM dd, yyyy")}
        </TableCell>

        <TableCell className="flex justify-end">
          <DocumentMenu 
          documentId={document._id}
          title={document.title}
          />
        </TableCell>

    </TableRow>
  );
};

export default DocumentTableRow;
