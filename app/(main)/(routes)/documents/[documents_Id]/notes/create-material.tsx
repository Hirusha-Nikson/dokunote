"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateMaterialProps {
  note: {
    _id: Id<"notes">;
    content: string;
    team: boolean;
    ownerId: string;
    important?: "very-important" | "important" | "less-important" | "no-label";
    _creationTime: string;
    source?: string;
    sourcetype?: string;
  };
}

export const CreateMaterial = ({ note }: CreateMaterialProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const params = useParams();
  const documents_Id = params?.documents_Id as Id<"document">;

  const createMaterial = useMutation(api.useMaterials.CreateMaterials);
  const removeMaterial = useMutation(api.useMaterials.removeMaterials);

  // Fetch existing materials for this document
  const existingMaterials = useQuery(api.useMaterials.getMaterialsByDocumentId, {
    documentId: documents_Id,
  });

  // Find material for this specific note
  const material = existingMaterials?.find((mat) => mat.note_id === note._id);

  const handleCreate = async () => {
    setIsProcessing(true);
    try {
      await createMaterial({
        id: documents_Id,
        note_id: note._id,
        materialContent: note.content,
        source: note.source,
        sourcetype: note.sourcetype,
        important: note.important,
      });
      toast.success("Material created successfully!");
    } catch {
      toast.error("Something went wrong while creating the material!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async () => {
    if (!material?._id) return;
    setIsProcessing(true);
    try {
      await removeMaterial({ id: material._id });
      toast.success("Material removed successfully!");
    } catch {
      toast.error("Something went wrong while removing the material!");
    } finally {
      setIsProcessing(false);
    }
  };

  const isMaterialExists = Boolean(material);

  return (
    <Button
      variant={isMaterialExists ? "destructive" : "outline"}
      disabled={isProcessing || !note.content}
      onClick={isMaterialExists ? handleRemove : handleCreate}
      title={isMaterialExists ? "Remove Material" : "Create Material"}
      size="icon"
    >
      {isMaterialExists ? <X className="size-4" /> : <Plus className="size-4" />}
    </Button>
  );
};
