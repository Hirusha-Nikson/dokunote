"use client";
import { useState } from "react";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { toast } from "sonner";

interface DeleteNoteProps {
  noteId: Id<"notes">;
}

export const DeleteNote = ({ noteId }: DeleteNoteProps) => {
  const handleDelete = useMutation(api.notes.deleteNote);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
           <span className="">Delete</span> 
           <Trash className="size-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] sm:w-auto"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            style={{ backgroundColor: "#b82e2e", color: "white" }}
            disabled={isDeleting}
            onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(true);
                handleDelete({ noteId })
                  .then(() => {
                    toast.success("Note deleted successfully");
                  })
                  .catch(() => {
                    toast.error("Something went wrong !");
                  })
                    .finally(() => {
                        setIsDeleting(false);
                    });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
