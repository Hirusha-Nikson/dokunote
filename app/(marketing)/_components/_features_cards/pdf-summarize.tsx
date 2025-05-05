"use client";

import Image from "next/image";

import Ai from "@/components/assets/ai-summarizer-1.svg"

const PDFSummarizeCard = () => {

    return (
      <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center ">

              <Image
                src={Ai}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl object-cover w-full dark:brightness-80 dark:invert dark:hue-rotate-180 scale-65 group-hover:scale-55 transition-all duration-300"
              />
              
          </div>
          <div className="w-full flex flex-col justify-center">
            <div className="p-4">
              <h1 className="text-md font-semibold">Summarize</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Easily extract key insights from long PDFs using powerful AI-driven summarization — perfect for research-heavy work.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default PDFSummarizeCard;