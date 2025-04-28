"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CreateNote = ({ onClose }: { onClose: () => void }) => {

    const params = useParams();
    const documents_Id = params?.documents_Id;
  
    const createNote = useMutation(api.notes.createNote);
  
    const [isCreating, setIsCreating] = useState(false);
    const [noteContent, setNoteContent] = useState("");
  
    const onNoteSubmit = (content: string) => {
      setIsCreating(true);
      createNote({ id: documents_Id as Id<"document">, content, important: "no-label" })
        .then(() => {   
          toast.success("Note created successfully!");
        })
        .finally(() => {
          onClose();
          setIsCreating(false);
        });
    }
  
    return (
      <div className="flex flex-col mt-4 w-full mx-auto animate-in fade-in-0 duration-300">
        <Card>
          <CardHeader>
            <CardTitle>Write a Note</CardTitle>
            <CardDescription>
              You can create a note for your document here for further uses. Also
              you can share your notes with your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your note here..."
              className="resize-y min-h-24"
              onChange={(e) => setNoteContent(e.target.value)}
              value={noteContent}
            />
          </CardContent>
          <CardFooter className="flex justify-end items-center gap-2">
            <Button
            variant="outline" 
            onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
            variant="dokunote"
            onClick={() => onNoteSubmit(noteContent)}
            disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };