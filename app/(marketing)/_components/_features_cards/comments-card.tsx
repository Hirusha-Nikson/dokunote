"use client";

import Image from "next/image";

import Comments from "@/components/assets/anchored-threads.jpg"

const CommentsCard = () => {

    return (
      <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center ">

              <Image
                src={Comments}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl object-cover scale-115 invert-0 dark:invert dark:hue-rotate-180 dark:brightness-90 w-full group-hover:scale-105 transition-all duration-300"
              />
              
          </div>
          <div className="w-full flex flex-col justify-center mt-2">
            <div className="p-4">
              <h1 className="text-md font-semibold">Comment</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Leave inline comments directly in your documents to share ideas, ask questions, or resolve feedback instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default CommentsCard;