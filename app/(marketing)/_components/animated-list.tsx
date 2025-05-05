"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Replied",
    description: "Someone replied to your comment",
    time: "15m ago",

    icon: "D",
    color: "#00C9A7",
  },
  {
    name: "Commented",
    description: "Someone commented in this document",
    time: "10m ago",
    icon: "N",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Someone sent you a message",
    time: "5m ago",
    icon: "G",
    color: "#FF3D71",
  },
  {
    name: "Mentioned",
    description: "Someone mentioned you in a comment",
    time: "2m ago",
    icon: "J",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        // "bg-zinc-800 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu bg-zinc-900/5 backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-md font-medium text-white">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-md font-medium">
            <span className="text-sm sm:text-md text-foreground">{name}</span>
            <span className="mx-1 text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </figcaption>
          <p className="text-xs font-normal text-muted-foreground line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 "></div>
    </div>
  );
}
