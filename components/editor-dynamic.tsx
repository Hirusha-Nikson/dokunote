"use client";
 
import dynamic from "next/dynamic";
 
export const EditorDemo = dynamic(() => import("./editor-demo"), { ssr: false });