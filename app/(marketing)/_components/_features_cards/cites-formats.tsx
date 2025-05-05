"use client";

import Image from "next/image";

import Cites from "@/components/assets/cite-from.jpg"

const CitesFormatCard = () => {
    return ( 
        <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center ">

              <Image
                src={Cites}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl object-cover scale-105 invert-0 dark:invert dark:brightness-90 w-full group-hover:scale-100 transition-all duration-300"
              />
              
          </div>
          <div className="w-full flex flex-col justify-center mt-2">
            <div className="p-4">
              <h1 className="text-md font-semibold">Cite</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Generate citations in APA, Harvard, Chicago, and more — all formatted automatically as you collect your sources.
              </p>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default CitesFormatCard;