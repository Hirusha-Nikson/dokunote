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
import { useMutation, useQuery } from "convex/react";
import { Copy, Loader, Trash} from "lucide-react";
import { useParams } from "next/navigation";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { toast } from "sonner";

const CitationListPreview = () => {
  const params = useParams();
  const documents_Id = params.documents_Id as Id<"document">;


  const citationList = useQuery(api.citations.getCitationsByDocumentId, {
    documentId: documents_Id,
  });

  const remove = useMutation(api.citations.removeCitation);


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
                <Button variant={"ghost"} size={"icon"} onClick={() => {
                  navigator.clipboard.writeText(citation.citationContent)
                  .then(() => {
                    toast.success("Citation copied to clipboard!");
                  })
                  .catch(() => {
                    toast.error("Failed to copy citation. Please try again.");
                  })
                  }}>
                  <Copy className="size-4 text-muted-foreground"/>
                </Button>
                <Button variant={"ghost"} size={"icon"} onClick={() => {
                  remove({citationId: citation._id})
                  .then(() => {
                    toast.success("Citation removed successfully!");
                  })
                  .catch(() => {
                    toast.error("Failed to remove citation. Please try again.");
                  })
                  }}>
                  <Trash className="size-4 text-muted-foreground"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="">
         <Button
  // onClick={() => {
  //   const formatted = citationList
  //     ?.map((c) => `• ${c.citationContent}`)
  //     .join("\n\n");

  //   if (formatted) {
  //     sessionStorage.setItem("bulkCitations", formatted);
  //     toast.success("All citations ready to insert into your document!");
  //   } else {
  //     toast.error("No citations available to insert.");
  //   }
  // }}
  onClick={() => {
    sessionStorage.setItem("bulkCitations", citationList.map((c) => `• ${c.citationContent}`).join("\n\n"));
    toast.success("All citations ready to insert into your document!");
    console.log(citationList.map((c) => `• ${c.citationContent}`).join("\n\n"));
  }}
>
  Generate citations
</Button>

      </div>
    </div>
  );
};

export default CitationListPreview;
