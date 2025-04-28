"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { History } from "lucide-react";
import { NoteCard } from "./note-card";
import { useUser } from "@clerk/nextjs";


export const NoteListShared = () => {
  const params = useParams();

  const { user } = useUser();

  const documents_Id = params.documents_Id as Id<"document">;

  const sharedNotes = useQuery(api.notes.getSharedNotesByDocumentId, {
    documentId: documents_Id,
  });

  return (
    <div className="flex flex-col mt-8 w-full mx-auto">
      <div className="flex items-center gap-1">
        <History className="size-4 text-muted-foreground" />
        <p className="text-sm font-light text-muted-foreground">Shared Notes{sharedNotes && sharedNotes.length}</p>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {sharedNotes && sharedNotes.length > 0 ? (
          sharedNotes.map((note) => (
            <NoteCard key={note._id} note={note} isOwner={user?.id === note.ownerId} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full my-4">
            <p className="text-xs text-center text-muted-foreground">No shared notes found</p>
          </div>
        )}
      </div>
    </div>
  );
};
