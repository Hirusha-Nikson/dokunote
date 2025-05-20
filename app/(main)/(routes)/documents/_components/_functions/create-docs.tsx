"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

import { LucideIcon } from "lucide-react";

import { useMutation } from "convex/react"; 
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface CreateDocumentsDialogProps {
  buttonText: string;
  icon: LucideIcon;
  className?: string;
}

const CreateDocument = ({
  buttonText,
  icon: Icon,
  className,
}: CreateDocumentsDialogProps) => {

  const router = useRouter();
  const create = useMutation(api.documents.createDocument);

  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const onDialogSubmit = (title: string, content: string) => {
    setIsCreating(true);
    create({ title, content })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
        setIsDialogOpen(false);
      })
      .finally(() => {
        setIsCreating(false);
      });

      toast.success("Document created successfully!");
  };


  return (
    <Dialog 
    open={isDialogOpen} 
    onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="group/create">
        <div
        role="button"
          className={`flex items-center gap-2 whitespace-nowrap rounded-md w-full text-sm font-medium cursor-pointer ${className}`}
          onClick={() => setIsDialogOpen(true)} 
        >
          <Icon style={{height:"1rem", width: "1rem"}} className="group-hover/create:stroke-sky-500"/>
          <span>{buttonText}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[300px] md:w-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Create a new document</DialogTitle>
          <DialogDescription>
            Give a name to your document here. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Document name"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => onDialogSubmit(documentTitle, "")}
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocument;