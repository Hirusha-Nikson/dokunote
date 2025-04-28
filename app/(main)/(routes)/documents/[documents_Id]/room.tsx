"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "@/components/loading-spinner";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { toast } from "sonner";

import { getUsers, getDocuments } from "@/lib/use-others.actions";
import { Id } from "@/convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
  
        queueMicrotask(() => {
          setUsers(list);
        });
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers();
    }, 50); // slight delay to let Liveblocks settle
  
    return () => clearTimeout(timeout);
  }, [fetchUsers]);

  return (
    <div>
      <ThemeProvider>
    <LiveblocksProvider
      throttle={16}
      authEndpoint={
        async () => {
          const endpoint = "/api/liveblocks-auth";
          const room = params.documents_Id as string;

          const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({ room }),
          });

          return response.json();
        }
      }
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async( {roomIds} ) => {
        const documents = await getDocuments(roomIds as Id<"document">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider id={params.documents_Id as string}>
        <ClientSideSuspense fallback={<LoadingSpinner label="Room loading"/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
    </ThemeProvider>
    </div>
  );
}