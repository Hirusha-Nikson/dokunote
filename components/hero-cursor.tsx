"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

interface HeroCursorProps {
  userName: string;
  color: string;
}

export default function HeroCursor({ userName, color }: HeroCursorProps) {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // 🛑 Don't render until mouse has moved
  if (!mousePosition) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transform: "translate(-50%, -50%)",
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      <div className="flex">
        <MousePointer2
          style={{ fill: color }}
          className={`size-5 stroke-0 -translate-y-3.5 ${color ? "" : "fill-green-500"}`}
        />

        <span
          style={{ backgroundColor: color }}
          className={`text-white text-xs px-2 rounded-md rounded-tl-none -translate-x-1.5 flex items-center ${color ? "" : "bg-green-500"}`}
        >
          {userName}
        </span>
      </div>
    </motion.div>
  );
}
