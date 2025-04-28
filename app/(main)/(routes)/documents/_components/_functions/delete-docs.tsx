"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


interface RemoveDocumentProps {
    documentId: Id<"document">;
    children: React.ReactNode;
}

const RemoveDocument = ({documentId, children} : RemoveDocumentProps) => {

    const handleDelete = useMutation(api.documents.deleteDocument);
    const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent 
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] sm:w-auto"
        >
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your document.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                style={{backgroundColor: "#b82e2e", color: "white"}}
                disabled={isDeleting}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleting(true);
                    handleDelete({ id: documentId })
                    .then(() => {
                        toast.success("Document deleted successfully");
                        window.location.replace("/documents");
                    })
                    .catch(() => {
                        toast.error("Something went wrong")
                    })
                    .finally(() => {
                        setIsDeleting(false);
                    })
                }}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveDocument