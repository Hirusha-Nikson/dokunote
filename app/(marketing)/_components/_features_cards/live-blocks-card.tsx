"use client";

import Image from "next/image";

import LiveBlock  from "@/components/assets/liveblock-dark.svg";

const LiveBlocksCard = () => {


  return (
    <div className="relative w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
      <div className="flex flex-col py-4 w-full items-center justify-between">
        <div className="w-full flex flex-col items-center justify-end mb-6">

            <Image
              src={LiveBlock}
              alt="nextjs"
              width={260}
              height={260}
              className="rounded-xl object-cover scale-115 invert dark:invert-0"
            />

        </div>
        {/* <div className="w-full flex flex-col justify-center z-10">
          <div className="p-4">
            <h1 className="text-md font-semibold">LiveBlock</h1>
            <p className="text-muted-foreground text-xs line-clamp-3">
              Blocknote is a powerful rich text editor that allows you to create and edit documents with ease. It supports various formatting options, including headings, lists, images, and more.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LiveBlocksCard;
