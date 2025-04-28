"use client";

import { useOrganization } from "@clerk/nextjs";
import { useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-blocknote";
import { BlockNoteEditor } from "@blocknote/core";

export function Threads({ editor }: { editor: BlockNoteEditor | null }) {
  const { organization } = useOrganization(); // <- get current organization

  const { threads } = useThreads({ query: { resolved: false } });

  // Hide threads if no editor OR user is not in an organization
  if (!editor || !organization) {
    return null;
  }

  return (
    <>
      <div className="anchored-threads bg-background text-foreground animate-in fade-in-0 duration-300">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
}
