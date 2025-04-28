"use client";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

interface RenameDocumentProps {
  children: React.ReactNode;
  initialTitle: string;
  documentId: Id<"document">;
}

const RenameDocument = ({
  documentId,
  initialTitle,
  children,
}: RenameDocumentProps) => {
  const rename = useMutation(api.documents.updateDocument);
  const [isRenaming, setIsRenaming] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onRenameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRenaming(true);

    rename({ id: documentId, title: title.trim() || "Untitled Document" })
      .then(() => {
        toast.success("Document renamed successfully");
        setOpen(false);
      })
      .catch(() => {
        toast.error("Only admins can rename documents");
      })
      .finally(() => {
        setIsRenaming(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] sm:w-auto"
      >
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onRenameSubmit}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Document Name"
            className="w-full p-2 border border-gray-200 dark:border-neutral-700 rounded-lg"
          />

          <DialogFooter>
            <Button
              type="button"
              variant={"outline"}
              disabled={isRenaming}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isRenaming}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDocument;
