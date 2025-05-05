"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import UserObject from "@/components/assets/user-object.png";
import UserObjectDark from "@/components/assets/user-object-dark.png";

const Authentication = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true); // prevent hydration error
    }, []);
  
    const selectedImage = resolvedTheme === "dark" ? UserObjectDark : UserObject;
  
    return (
      <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center justify-end">
            {mounted && (
              <Image
                src={selectedImage}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl object-cover scale-115 dark:contrast-107 dark:brightness-90 w-full group-hover:scale-105 transition-all duration-300"
              />
            )}
          </div>
          <div className="w-full flex flex-col justify-center z-10 h-[8rem] ">
            <div className="p-4">
              <h1 className="text-md font-semibold">Secure</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Clerk ensures your data stays protected with reliable authentication and secure user management for every session.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Authentication;