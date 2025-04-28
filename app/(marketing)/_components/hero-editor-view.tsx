"use client";

import { useState } from "react";
import HeroCursor from "@/components/hero-cursor";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useUser } from "@clerk/nextjs";
import Rive from "@rive-app/react-canvas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useConvexAuth } from "convex/react";

const HeroEditorView = () => {
  const { isLoading } = useConvexAuth();

  const [showCursor, setShowCursor] = useState(false);

  const user = useUser();

  const name = user?.user?.firstName ?? "123456789";
  const nameToNUmber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNUmber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  return (
    <div className="w-full h-[calc(100vh-180px)] flex flex-col items-center justify-center rounded-[16px] border mt-16 dark:bg-muted/25 bg-muted shadow-2xl">
      <div className="h-8 w-full flex items-center justify-between px-4 group/fileaction">
        <div className="flex gap-2 items-center ">
          <div className="size-3 rounded-full border transition-colors duration-300 group-hover/fileaction:bg-red-500"></div>
          <div className="size-3 rounded-full border transition-colors duration-300 group-hover/fileaction:bg-amber-500"></div>
          <div className="size-3 rounded-full border transition-colors duration-300 group-hover/fileaction:bg-green-500"></div>
        </div>
        <div className="flex items-center -ml-2">
          <div className="relative z-10 rounded-full size-6 bg-sky-500 border-2 border-background text-white flex items-center justify-center">
            D
          </div>
          {showCursor && (
            <div
              style={{ background: color }}
              className={`relative -ml-2 z-20 rounded-full size-6 border-2 border-background text-white flex items-center justify-center transition-all duration-300 ease-in-out ${color ? "" : "bg-green-500"}`}
            >
              {user.user?.firstName?.slice(0, 1) ?? "Y"}
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-[calc(100%-16px)] h-[calc(100%-48px)] rounded-[16px] border overflow-hidden bg-background p-4 
        ${showCursor ? "cursor-none" : ""}`}
        onMouseEnter={() => setShowCursor(true)}
        onMouseLeave={() => setShowCursor(false)}
      >
        <div className="w-5/6 h-full overflow-hidden mx-auto grid grid-cols-2 justify-between gap-8">
          <div className="w-full flex flex-col items-start justify-center mx-auto mt-2.5">
            {/* <h1 className="text-5xl font-bold">
            Smarter Documentation, Powered by You and AI
            </h1> */}
            {/*             
            <div className="flex overflow-hidden w-full min-h-14 -translate-x-14">
             <Rive src="/banner.riv" stateMachines="Banner"/>
            </div> */}

            <div className="flex items-center justify-center px-4 py-1 rounded-xl bg-neutral-400/60 dark:bg-neutral-700 my-2">
              <span className="text-xs">✨ Dokunote is powered by AI.</span>
            </div>

            <TypingAnimation
              duration={50}
              className="text-5xl font-boldtext-foreground"
            >
              Think, Note, Cite – Dokunote’s Got the Rest.
            </TypingAnimation>
            <p className="text-sm mt-8 text-muted-foreground">
              Create, organize, and reference documents faster than ever.
              Capture ideas manually or with AI, collaborate in real-time, and
              generate professional citations — all in one powerful workspace.
            </p>

            <div className="mt-8">
              <Button
                className={cn(
                  `flex items-center mx-auto text-center justify-center cursor-none`,
                  isLoading ? "cursor-not-allowed" : ""
                )}
                onClick={() => {
                  window.location.href = "/sign-in";
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="size-4 animate-spin" />
                    <span className="ml-2 opacity-85">Loading...</span>
                  </span>
                ) : (
                  <span className="">Try Dokunote - It&apos;s Free</span>
                )}
              </Button>
            </div>
          </div>

          {/* <div className="translate-x-4 scale-105">
            <Rive src="/hero (6).riv" stateMachines="Popover" />
          </div> */}
        </div>
        {showCursor && (
          <HeroCursor userName={user.user?.firstName ?? "You"} color={color} />
        )}
      </div>
    </div>
  );
};

export default HeroEditorView;
