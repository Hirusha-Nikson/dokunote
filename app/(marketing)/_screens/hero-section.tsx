"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import HeroEditorView from "../_components/hero-editor-view";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-background via-background/40 to-background">
      {/* First floating circle */}
      {/* First breathing circle */}
      <motion.div
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -top-36 -left-36 border-64 border-sky-600/60 blur-md size-[500px] -z-10 rounded-full"
      />

      {/* Second breathing circle */}
      <motion.div
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -right-24 bottom-12 border-64 border-sky-600/60 blur-md size-96 -z-10 rounded-full"
      />

      <DotPattern
        // glow={true}
        cr={1.5}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 0%, transparent 450px, rgba(0,0,0,0.8) 1250px, black 100%)",
          maskImage:
            "radial-gradient(circle at center, transparent 0%, transparent 450px, rgba(0,0,0,0.8) 1250px, black 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskSize: "cover",
        }}
        className="-z-10 bg-gradient-to-bl from-sky-800/80 via-sky-800/50 to-background"
      />
      <div className="w-3/4">
        <HeroEditorView />
      </div>
    </div>
  );
};

export default HeroSection;
