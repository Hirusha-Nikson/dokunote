"use client";

import { EditorDemo } from "@/components/editor-dynamic";
import { FadeUp } from "@/components/fade-up";
// import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { Hash } from "lucide-react";
// import {motion} from "framer-motion";

const DemoScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-0 overflow-hidden dark:bg-gradient-to-tr dark:from-background dark:via-background/40 dark:to-background my-24">
      {/* <DotPattern className="opacity-50 -z-10" />
<motion.div
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute hidden md:block -top-36 -right-36 border-64 dark:border-sky-500/20 border-sky-300/20 blur-md size-[500px] -z-10 rounded-full"
      />

      <motion.div
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute hidden md:block -left-24 bottom-12 border-64 dark:border-sky-500/20 border-sky-300/20 blur-md size-96 -z-10 rounded-full"
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 justify-between w-full mx-auto md:w-5/6 px-4 md:px-0">
        <div className="col-span-2 h-full w-full flex items-center">
          <div className="flex-1 flex-col space-y-2">
          <FadeUp duration={0.5} delay={0.6}>
        <div className="flex gap-1 items-center text-sky-500">
          <Hash className="size-3.5" />
          <span>Live demo</span>
        </div>
        </FadeUp>
            <FadeUp duration={0.5} delay={0.7}>
            <h1 className="text-3xl font-semibold">
              Experience the Dokunote Editor ✨
            </h1>
            </FadeUp>
            <FadeUp duration={0.5} delay={0.8}>
            <p className="text-sm text-muted-foreground hidden md:block">
            Try out Dokunote to experience real-time collaboration, citations, and more — all in your browser.
            </p>
            </FadeUp>
            <Button
              className="hidden md:block"
              variant="outline"
              size="lg"
              onClick={() => window.open("/sign-in")}
            >
              Try it out
            </Button>
          </div>
        </div>
        <div className="h-full rounded-3xl shadow-lg bg-neutral-50 dark:bg-neutral-800 border col-span-6">
          <EditorDemo />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-4 my-4 md:hidden gap-3">
      <p className="text-sm text-muted-foreground text-center">
      Try out Dokunote to experience real-time collaboration, citations, and more — all in your browser.
            </p>
            <Button
              className=""
              variant="outline"
              size="lg"
              onClick={() => window.open("/sign-in")}
            >
              Try it out
            </Button>
      </div>
    </div>
  );
};

export default DemoScreen;
