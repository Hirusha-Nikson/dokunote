"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader, MoreVertical } from "lucide-react";
import { useParams } from "next/navigation";
import MarkdownPreview from "@uiw/react-markdown-preview";

const CitationListPreview = () => {
  const params = useParams();
  const documents_Id = params.documents_Id as Id<"document">;


  const citationList = useQuery(api.citations.getCitationsByDocumentId, {
    documentId: documents_Id,
  });

  if (!citationList) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <Loader className="animate-spin size-5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Loading citations...</p>
      </div>
    );
  }

  return (
    <div className="flex mx-auto flex-col mt-6 w-full">
      <Table>
        <TableCaption>Citation table</TableCaption>
        <TableBody>
          {citationList?.map((citation) => (
            <TableRow
              key={citation._id}
              className="flex justify-between items-center"
            >
              <TableCell>
                <MarkdownPreview
                  className="break-words whitespace-pre-wrap max-w-full"
                  source={citation.citationContent}
                  style={{
                    backgroundColor: "transparent",
                    color: "inherit",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button variant={"ghost"} size={"icon"}>
                  <MoreVertical className="size-4 text-muted-foreground" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CitationListPreview;
