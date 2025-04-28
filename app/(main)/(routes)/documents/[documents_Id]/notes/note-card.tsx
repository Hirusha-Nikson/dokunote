"use client";
import { DeleteNote } from "./delete-note";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { useOrganization } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Highlighter, MoreVertical, Undo, Users, UserX } from "lucide-react";

import { toast } from "sonner";
import { format } from "date-fns";
import MarkdownPreview from '@uiw/react-markdown-preview';

import { getNoteOwner } from "../../../../../../lib/get-owner.action";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CreateMaterial } from "./create-material";

interface NoteCardProps {
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
  isOwner?: boolean;
}

export const NoteCard = ({ note, isOwner }: NoteCardProps) => {
  const toggleTeam = useMutation(api.notes.toggleTeamStatus);

  const colorLabel = useMutation(api.notes.toggleLabelColor);

  const params = useParams();

  const getPdf = useQuery(
    api.pdfstore.getPdfFiles,
    note.source
      ? {
          documentId: params.documents_Id as Id<"document">,
          fileId: note.source as Id<"pdfFiles">,
        }
      : "skip"
  );

  const handleLabelColor = async (color: string) => {
    try {
      await colorLabel({
        noteId: note._id,
        color: color ? color : "no-label",
      });
    } catch {
      toast.error("Something went wrong !");
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTeam({
        noteId: note._id,
        team: !note.team,
      });
      toast.success(
        note.team ? "Note removed from team!" : "Note shared with team!"
      );
    } catch {
      toast.error("Something went wrong !");
    }
  };

  const { organization } = useOrganization();

  const [ownerName, setOwnerName] = useState("Loading...");

  useEffect(() => {
    const fetchOwnerName = async () => {
      const name = await getNoteOwner(note.ownerId);
      setOwnerName(name);
    };

    fetchOwnerName();
  }, [note.ownerId]);


  

  return (
    <div className={`relative flex flex-col p-4 border rounded-md shadow-md hover:scale-102 animate-in fade-in-0 duration-500 overflow-hidden 
      ${(note.important ?? "no-label") === "very-important" ? "bg-red-500/10" : ""}
      ${(note.important ?? "no-label") === "important" ? "bg-amber-500/10" : ""}
      ${(note.important ?? "no-label") === "less-important" ? "bg-green-500/10" : ""}`}>
    
    {(note.important ?? "no-label") === "very-important" && (
      <div className="absolute h-2.5 w-full bg-red-500 top-0 left-0 opacity-85" />
    )}
    {(note.important ?? "no-label") === "important" && (
      <div className="absolute h-2.5 w-full bg-amber-500 top-0 left-0 opacity-85" />
    )}
    {(note.important ?? "no-label") === "less-important" && (
      <div className="absolute h-2.5 w-full bg-green-500 top-0 left-0 opacity-85" />
    )}
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex text-xs text-muted-foreground">
          {!isOwner ? (
            <p>@ {ownerName}&apos;s note</p>
          ) : ("@ Your note")}
        </div>
        <div className="flex gap-2 items-center">

          {isOwner && organization ? (
            <Button
              variant={"outline"}
              onClick={handleToggle}
              title={
                note.team ? "Remove from team" : "Share with team"
              }
              className={`px-3 py-1 rounded-md text-xs ${
                note.team ? "" : ""
              }`}
            >
              {note.team ? <UserX /> :<Users /> }
            </Button>
          ) : null}

          <CreateMaterial note={note}/>
        
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                variant="outline"
                title="More options"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Highlighter className="mr-1 size-4" />
                  Labels
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleLabelColor("very-important")}
                    className="flex items-center justify-between"
                  >
                    <span>Very Important</span>
                    <div className="size-3 rounded-full bg-red-500"></div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLabelColor("important")}
                    className="flex items-center justify-between"
                  >
                    <span>Important</span>
                    <div className="size-3 rounded-full bg-amber-500"></div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLabelColor("less-important")}
                    className="flex items-center justify-between"
                  >
                    <span>Less Important</span>
                    <div className="size-3 rounded-full bg-green-500"></div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLabelColor("no-label")}
                    className="flex items-center justify-between"
                  >
                    <span>Remove</span>
                    <Undo className="size-3.5" />
                  </DropdownMenuItem>
                  
                </DropdownMenuGroup>
                {isOwner && <DropdownMenuSeparator />}
                
               {isOwner &&
               
               <DropdownMenuGroup>
                   <DeleteNote noteId={note._id} />
                </DropdownMenuGroup>
                }
              </DropdownMenuContent>
            </DropdownMenu>
  
        </div>
      </div>

      <div className="w-full px-0.5 my-3">
         
      
            <span className="text-xs text-muted-foreground"> {note.sourcetype}</span>
            {note.sourcetype === "pdf" && <span className="text-xs text-muted-foreground">{getPdf?.fileName}</span>}
            {!note.sourcetype && <span className="text-xs text-muted-foreground">manual note</span>}
        <MarkdownPreview
          className="py-2 text-foreground"
          source={note.content} 
          style={{
            backgroundColor: "transparent",
            color: "inherit"
          }}
          />
          
          <p className="text-xs text-muted-foreground">
            {format(new Date(note._creationTime), "MMM dd, yyyy ")}
          </p>
      </div>
    </div>
  );
};