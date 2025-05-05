"use client";

import Image from "next/image";

import Ai from "@/components/assets/ai-summarizer-2.svg"

const ExportFileCard = () => {

    return (
      <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center ">

              <Image
                src={Ai}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl scale-70 object-cover w-full dark:brightness-80 dark:invert dark:hue-rotate-180 group-hover:scale-60 transition-all duration-300"
              />
              
          </div>
          <div className="w-full flex flex-col justify-center">
            <div className="p-4">
              <h1 className="text-md font-semibold">Export</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Download your work in multiple formats like PDF or DOCX, ready for submission, printing, or sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ExportFileCard;