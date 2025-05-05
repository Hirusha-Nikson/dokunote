"use client";

// import { motion } from "framer-motion";
import Rive from "@rive-app/react-canvas";
import { useTheme } from "next-themes";
const NoteCard = () => {
  const theme = useTheme();
  const { resolvedTheme } = theme;
  const isDark = resolvedTheme === "dark";

  return (
    <div className="group isolate flex flex-col rounded-2xl bg-neutral-50 dark:bg-neutral-800 min-h-full h-full shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden order-first xl:order-none border">
      <div className="relative z-10 flex-none px-6 order-last pb-6 text-foreground">
        <h3 className="text-sm font-medium">Create Notes</h3>
        <p className="mt-2 text-pretty text-sm/5">
          Write a note for your document and share it with your team.
        </p>
      </div>

      <div
        className="pointer-events-none relative flex-auto select-none"
        aria-hidden="true"
      >
        <div className="relative flex h-full flex-col items-center justify-center">
          {/* Background blur circles */}
          {/* <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <motion.div className="absolute rounded-full border border-foreground opacity-15 blur-[1px] w-3/4 h-3/4" />
            <motion.div className="absolute rounded-full border border-foreground opacity-10 blur-[2px] w-full h-full" />
            <div className="absolute rounded-full border border-foreground opacity-7 blur-[4px] w-[120%] h-[120%]" />
          </div> */}

          <div className=" overflow-hidden w-full bg-transparent flex px-4 h-full md:scale-80">
            {isDark ? (
              <Rive
                key="dark"
                src="/note (3).riv"
                stateMachines="State Machine 1"
              />
            ) : (
              <Rive
                key="light"
                src="/note.riv"
                stateMachines="State Machine 1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
