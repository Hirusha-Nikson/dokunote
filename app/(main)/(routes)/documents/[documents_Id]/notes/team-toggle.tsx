"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TeamToggle({ note }: { note: any }) {
  const toggleTeamStatus = useMutation(api.notes.toggleTeamStatus);

  const handleToggle = async () => {
    try {
      await toggleTeamStatus({
        noteId: note._id, // this line was likely missing or incorrect
        team: !note.team,
      });
    } catch {
      alert("Failed to update team status");
    }

    console.log("Note ID:", note._id);
    console.log("New Team Status:", !note.team);
    
  };
  

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={`team-toggle-${note._id}`} className="text-sm">
        Share with Team
      </label>
      <input
        id={`team-toggle-${note._id}`}
        type="checkbox"
        checked={note.team}
        onChange={handleToggle}
        className="w-4 h-4"
      />
    </div>
  );
}
