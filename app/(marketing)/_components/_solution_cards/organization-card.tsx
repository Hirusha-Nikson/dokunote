"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const OrganizationCard = () => {
  const buttonControls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      buttonControls.start({
        boxShadow: [
          "0px 0px 0px rgba(255, 255, 255, 0)",   // No shadow
          "0px 0px 8px #0ea5e9", // Glow
          "0px 0px 0px rgba(255, 255, 255, 0)",   // Back to no shadow
        ],
        transition: {
          times: [0, 0.5, 1],
          duration: 2,
          ease: "easeInOut",
        },
      });
    }, 4000); // Match the SVG light beam duration

    return () => clearInterval(interval);
  }, [buttonControls]);

  return (
    <div className="group isolate flex flex-col rounded-2xl bg-neutral-50 dark:bg-neutral-800 h-full shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden order-first xl:order-none border">
      <div className="relative z-10 flex-none px-6 order-last pb-6 text-foreground">
        <h3 className="text-sm font-medium">Team up</h3>
        <p className="mt-2 text-pretty text-sm/5">
          Team up with your peers and share everything.
        </p>
      </div>

      <div className="pointer-events-none relative flex-auto select-none" aria-hidden="true">
        <div className="relative flex h-full flex-col items-center justify-center">
          {/* Background blur circles */}
          {/* <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <motion.div className="absolute rounded-full border border-foreground opacity-15 blur-[1px] w-3/4 h-3/4" />
            <motion.div className="absolute rounded-full border border-foreground opacity-10 blur-[2px] w-full h-full" />
            <div className="absolute rounded-full border border-foreground opacity-7 blur-[4px] w-[120%] h-[120%]" />
          </div> */}

          {/* Avatars */}
          <div className="flex gap-4 mt-4">
            {["D", "N", "G"].map((letter, idx) => (
              <div key={idx} className="size-10 rounded-full border-2 bg-neutral-400 dark:bg-neutral-700 shadow ring-1 ring-gray-950/5 flex justify-center items-center text-white font-semibold text-lg">
                <span>{letter}</span>
              </div>
            ))}
          </div>

          {/* Light beam line animation */}
          <div className="relative aspect-[128/55] w-1/3 mt-2 -mb-2">
            <svg viewBox="0 0 128 55" fill="none" aria-hidden="true" className="absolute inset-0 size-full">
              <motion.path
                d="M64 0v25M8 0v8c0 8.837 7.163 16 16 16h24c8.837 0 16 7.163 16 16v15M120 0v8c0 8.837-7.163 16-16 16H80c-5.922 0-11.093 3.218-13.86 8"
                stroke="#0ea5e9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          {/* Auto-join small button */}
          <motion.div
            animate={buttonControls}
            className="relative mt-4 flex items-center gap-1.5 border rounded-lg bg-background text-muted-foreground py-1 pl-1.5 pr-2 text-2xs font-medium shadow ring-1 ring-gray-950/5"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="size-4"
            >
              <g
                stroke="#9394A1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              >
                <circle cx="8" cy="8" r="6.25" />
                <path d="M8 5v6m3-3H5" />
              </g>
            </svg>
            invite users
            <div className="absolute -bottom-1.5 left-1/2 -z-10 -translate-x-1/2 h-6 w-20 rounded-[50%] bg-gray-600/40 blur-sm" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
