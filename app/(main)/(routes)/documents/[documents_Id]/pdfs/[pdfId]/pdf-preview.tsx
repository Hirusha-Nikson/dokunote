"use client";

import { Loader } from "lucide-react";

interface PdfPreviewProps {
  fileUrl: string;
}

export const PdfPreview = ({ fileUrl }: PdfPreviewProps) => {

  return (
    <div className="flex flex-col w-full">
      {fileUrl ? (
        <iframe
          src={fileUrl+"#toolbar=0"}
          className="w-full h-[calc(100vh-64px)]"
          style={{ border: "none"}}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title="PDF Preview"
        />
      ) : (
        <div className="flex flex-col text-muted-foreground justify-center items-center min-h-full text-xs">
          <Loader className="animate-spin size-5" />
          <p className="mt-2.5">Loading PDF preview... </p>
        </div>
      )}
    </div>
  );
};
