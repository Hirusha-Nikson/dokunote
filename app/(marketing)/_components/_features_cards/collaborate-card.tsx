"use client";

import Image from "next/image";
import collabEditor from "@/components/assets/text-editor.jpg";

const CollaborateCard = () => {


  return (
    <div className="relative w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
      <div className="grid grid-rows-1 w-full items-center justify-between">
        <div className="w-full flex flex-col items-center justify-end">

            <Image
              src={collabEditor}
              alt="nextjs"
              width={260}
              height={260}
              className="rounded-xl object-cover scale-105 contrast-105 dark:contrast-100 w-full dark:invert dark:brightness-92 dark:hue-rotate-180 group-hover:scale-100 transition-all duration-300"
            />
        </div>
        <div className="w-full flex flex-col justify-center z-10 h-[8rem] ">
          <div className="p-4">
            <h1 className="text-md font-semibold">Collaborate</h1>
            <p className="text-muted-foreground text-xs line-clamp-3">
            Work with your team in real time — edit, comment, and share feedback seamlessly in the same document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborateCard;
