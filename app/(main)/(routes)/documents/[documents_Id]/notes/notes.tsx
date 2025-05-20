"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import NoteTabs from "./note-tabs";
import { CreateNote } from "./write-a-note";
import { CreateAINote } from "./create-ai-note";

export const NotesPage = () => {
  const params = useParams();
  const documents_Id = params?.documents_Id;

  const user = useUser();
  const [isOpenWriteNote, setIsOpenWriteNote] = useState(false);
  const [isOpenAiNote, setIsOpenAiNote] = useState(false);

  const handleCreateNoteOpen = () => {
    setIsOpenWriteNote(true);
  };

  const handleCreateNoteClose = () => {
    setIsOpenWriteNote(false);
  };

  const handleAiNoteOpen = () => {
    setIsOpenAiNote(true);
  };
  
  const handleAiNoteClose = () => {
    setIsOpenAiNote(false);
  };

  const documents = useQuery(api.documents.getById, {
    id: documents_Id as Id<"document">,
  });

  if (!user || !documents) {
    return null;
  }

  return (
    <div className="flex flex-col mt-4 w-full mx-auto">
      <div className="flex w-full items-center justify-between border border-muted rounded-2xl">
        
        <div className="flex flex-col w-full p-4">
           <h1>Create a note</h1>
            <p className="text-sm text-muted-foreground">
              You can create a note for your document here for further uses. Also
              you can share your notes with your team.
            </p>
        </div>
        <div className="flex items-center justify-end w-full p-4 gap-2">
            <Button 
            onClick={handleCreateNoteOpen}
            className="flex items-center justify-center"
            disabled={isOpenWriteNote || isOpenAiNote}
            >
              Write a note
            </Button>

            <Button 
            onClick={handleAiNoteOpen}
            className="flex items-center justify-center"
            disabled={isOpenWriteNote || isOpenAiNote}
            >
              Ai note
            </Button>

      </div>
          
      </div>
      {isOpenWriteNote && (
        <CreateNote onClose={handleCreateNoteClose} />
      )}

      {isOpenAiNote && (
        <CreateAINote onAiClose={handleAiNoteClose} />
      )}
      <NoteTabs/>
    </div>
  );
};