"use client";
import React, { useRef, useState, useEffect } from "react";
import { UseMaterialCard } from "./use-material-card";

export function FloatingDraggable() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 100 });

  useEffect(() => {
    const width = 260;
    setPosition({ x: window.innerWidth - width - 150, y: 80 });
  }, []);

  const startDragging = (startX: number, startY: number) => {
    setIsDragging(true);

    const handleMove = (clientX: number, clientY: number) => {
      setPosition({
        x: clientX - startX,
        y: clientY - startY,
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
      document.body.style.overflow = "";
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", handleEnd);
    };

    const mouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", touchMove, {passive: false});
    document.addEventListener("touchend", handleEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;
    startDragging(startX, startY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX - position.x;
    const startY = touch.clientY - position.y;
    startDragging(startX, startY);
  };

  return (
    <div
      ref={boxRef}
      className="fixed z-50 bg-muted border rounded-md shadow-md w-4/5 h-1/2 md:w-96 md:h-[calc(100vh-260px)] overflow-clip animate-in fade-in-0"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className="cursor-move bg-muted px-4 py-2 rounded-t-md border-b"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <h3 className="font-semibold">
          {isDragging ? "Used Material" : "Used Material"}
        </h3>
      </div>
      <div className="p-4 overflow-y-scroll h-full">
        <UseMaterialCard/>
      </div>
    </div>
  );
}
