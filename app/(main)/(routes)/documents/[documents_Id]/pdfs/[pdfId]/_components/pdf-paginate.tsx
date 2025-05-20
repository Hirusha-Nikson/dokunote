"use client";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { Card } from "@/components/ui/card";

import { PdfPaginateDropdown } from "./pdf-paginate-dropdown";

import { format } from "date-fns";

export const PDFPaginatePage = () => {
  const params = useParams();
  const documents_Id = params.documents_Id as Id<"document">;

  const router = useRouter();

  const pdfs = useQuery(api.pdfstore.getPdfFilesByDocumentId, {
    documentId: documents_Id,

  });

  const handlePDFClick = (fileId: string) => {
    router.push(`/documents/${documents_Id}/pdfs/${fileId}`);
  };

  if (!pdfs || pdfs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full mt-[64px] text-muted-foreground text-sm">
        No PDF file founded
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-3 mt-4">
      {pdfs.map((pdf) => (
        <Card
          role="button"
          key={pdf.fileId}
          className="relative flex flex-col items-center justify-center overflow-hidden cursor-pointer group/pdf"
          onClick={() => handlePDFClick(pdf.fileId)}
        >
          <PdfPaginateDropdown fileId={pdf.fileId} documentId={documents_Id}/>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler mt-2 icons-tabler-outline icon-tabler-file-type-pdf"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
            <path d="M17 18h2" />
            <path d="M20 15h-3v6" />
            <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
          </svg>

          <div className="w-full mr-4 overflow-hidden text-ellipsis whitespace-nowrap p-4 text-center">
            <p className="text-sm text-foreground">{pdf.fileName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(pdf._creationTime), "MMM dd, yyyy")}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
