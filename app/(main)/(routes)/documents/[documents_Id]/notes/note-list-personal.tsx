"use client";
import { useParams } from "next/navigation";

import { NoteCard } from "./note-card";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { History } from "lucide-react";

export const NoteListPersonal = () => {

  const params = useParams();
  const documents_Id = params.documents_Id as Id<"document">;

  const getNotes = useQuery(api.notes.getNotesByDocumentId, {
    documentId: documents_Id,
  });

  return (
    <div className="flex flex-col mt-8 w-full mx-auto">
      <div className="flex items-center gap-1">
        <History className="size-4 text-muted-foreground" />
        <p className="text-sm font-light text-muted-foreground">Recent Notes {getNotes && getNotes.length}</p>
      </div>
      {/* Note List */}
      <div className="flex flex-col gap-4 mt-4">
        {getNotes && getNotes.length > 0 ? (
          Array.isArray(getNotes) ? (
            getNotes.map((note) => (
              <NoteCard key={note._id} note={note} isOwner={true} />
            ))
          ) : (
            null
          )
        ) : (
          <div className="flex items-center justify-center w-full my-4">
              <p className="text-xs text-center text-muted-foreground">No notes found</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

