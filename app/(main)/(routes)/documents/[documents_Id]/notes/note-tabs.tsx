"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import { NoteListPersonal } from "./note-list-personal";
import { NoteListShared }from "./note-list-shared";

import { useOrganization } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const NoteTabs = () => {

  const params = useParams();
  const documnets_Id = params.documents_Id as Id<"document">;

  const { organization } = useOrganization();

  const countPersonalNotes = useQuery(api.notes.getNotesByDocumentId, {
    documentId: documnets_Id,
  });

  const countSharedNotes = useQuery(api.notes.getSharedNotesByDocumentId, {
    documentId: documnets_Id,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center border border-muted rounded-2xl my-4 p-4 animate-in fade-in-0 duration-500">
      <Tabs defaultValue="recent" className="w-full h-full mt-4" orientation="vertical">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent {countPersonalNotes && countPersonalNotes.length}</TabsTrigger>
          <TabsTrigger value="shared" disabled={!organization}>Shared {countSharedNotes && countSharedNotes.length}</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <NoteListPersonal />
        </TabsContent>
        <TabsContent value="shared">
          <NoteListShared />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoteTabs;