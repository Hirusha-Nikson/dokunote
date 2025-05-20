"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { CheckCheck, ClipboardCopy, Copy, Layers, Loader } from "lucide-react";
import { Button } from "./ui/button";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const UseMaterialCard = () => {
  const params = useParams();
  const documents_Id = params?.documents_Id;

  const getMaterials = useQuery(api.useMaterials.getMaterialsByDocumentId, {
    documentId: documents_Id as Id<"document">,
  });

  const [clickedCards, setClickedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("clickedCards");
    if (stored) {
      setClickedCards(JSON.parse(stored));
    }
  }, []);

  const getCardBgClass = (importance?: string) => {
    switch (importance) {
      case "very-important":
        return "bg-red-500/40 dark:bg-red-500/20";
      case "important":
        return "bg-amber-500/40 dark:bg-amber-500/20";
      case "less-important":
        return "bg-green-500/40 dark:bg-green-500/20";
      default:
      case "no-label":
        return "bg-card";
    }
  };

  if (!getMaterials) {
    return (
      <div className="mb-12 grid grid-cols-1 gap-1 justify-center items-center h-full animate-in fade-in-0 duration-300">
        <div className="flex flex-col justify-center items-center">
          <Loader className="animate-spin w-6 h-6 opacity-70 my-2" />
          <span className="text-sm opacity-70">Loading materials...</span>
        </div>
      </div>
    );
  }

  if (getMaterials.length === 0) {
    return (
      <div className="mb-12 grid grid-cols-1 gap-1 justify-center items-center h-full animate-in fade-in-0 duration-300">
        <div className="flex flex-col justify-center items-center">
          <Layers />
          <span className="text-sm opacity-70">No materials found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 grid grid-cols-1 gap-3 animate-in fade-in-0 duration-300">
      <div className="w-full flex flex-col justify-center items-center gap-0.5">
        <span className="text-xs text-muted-foreground">
          {getMaterials.length} notes are available
        </span>
      </div>
      {getMaterials?.map((material) => (
        <Card key={material._id} className={getCardBgClass(material.important)}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <p className="font-light text-xs line-clamp-1 truncate">{material.source}</p>
                {clickedCards[material._id] ? (
                  <CheckCheck className="size-4 text-foreground" />
                ) : null}
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  title="Copy note"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(material.materialContent)
                      .then(() => {
                        toast.success("Note copied to clipboard!");
                      })
                      .catch(() => toast.error("Failed to copy note"));
                  }}
                >
                  <Copy className="size-3.5" />
                </Button>
                <Button
                  variant="secondary"
                  size={"icon"}
                  title="Insert note"
                  onClick={() => {
                    sessionStorage.setItem(
                      "materialToInsert",
                      material.materialContent
                    );
                    const updatedState = {
                      ...clickedCards,
                      [material._id]: true,
                    };
                    setClickedCards(updatedState);
                    sessionStorage.setItem(
                      "clickedCards",
                      JSON.stringify(updatedState)
                    );
                    toast.success("Note added to your document!");
                  }}
                >
                  <ClipboardCopy className="size-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MarkdownPreview
              source={material.materialContent}
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
              className="line-clamp-3"
            />
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button>Generate citations</Button>
      </div>
    </div>
  );
};
