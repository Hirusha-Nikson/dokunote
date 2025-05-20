"use client";
import { Id } from "@/convex/_generated/dataModel";
import DocumentMenu from "../_components/paginate-menu";
// import { Button } from "@/components/ui/button";
// import { Sparkle } from "lucide-react";

interface EditorCoverProps {
  title: string;
  createdAt: string;
  documentId: Id<"document">;
}

const EditorCover = ({ title, createdAt, documentId }: EditorCoverProps) => {

  return (
    <div className="md:max-w-5xl mx-auto w-full flex flex-col gap-4 px-3 py-2 group h-full mt-16 animate-in fade-in-0 duration-300">
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">Created at {createdAt}</p>
        </div>
        <div className="flex gap-2 group-hover:opacity-100 opacity-80 transition-all duration-500">
          {/* <Button
            variant="outline"
            className="px-3 py-1 rounded text-xs text-foreground hover:bg-muted hover:text-primary transition-all duration-300 ease-in-out"
            onClick={() => {}}
          >
            <Sparkle className="mb-3 -mr-2 size-2.5" />
            <Sparkle className="mr-1 size-4" /> Ask AI
          </Button> */}
          <DocumentMenu documentId={documentId} title={title}/>
        </div>
      </div>
      <div className="flex items-center justify-between"></div>
    </div>
  );
};

export default EditorCover;