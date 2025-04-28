"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotificationList, InboxNotification } from "@liveblocks/react-ui";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { InboxIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <Button 
        variant={"outline"}
        disabled={true}
        className="relative"
        size={"icon"}>
          <InboxIcon className="size-5" />
        </Button>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="relative" size={"icon"}>
          <InboxIcon className="size-4" />
          {inboxNotifications.length > 0 && (
            <Badge
              variant={null}
              className="bg-sky-500 absolute -top-1.5 -right-1 size-5 text-xs flex items-center justify-center text-white"
            >
              {inboxNotifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {inboxNotifications.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        ) : (
          <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
