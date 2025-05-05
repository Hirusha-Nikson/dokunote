"use client";

import Image from "next/image";

import Comments from "@/components/assets/notification-rooms.jpg"

const NotificationCard = () => {

    return (
      <div className="w-full shadow-lg rounded-2xl border-2 bg-neutral-50 dark:bg-neutral-800 overflow-hidden group ">
        <div className="grid grid-rows-1 w-full items-center justify-between">
          <div className="w-full flex flex-col items-center ">

              <Image
                src={Comments}
                alt="nextjs"
                width={260}
                height={260}
                className="rounded-xl scale-105 object-cover contrast-105 dark:contrast-100 invert-0 dark:invert dark:hue-rotate-180 dark:brightness-95 w-full group-hover:scale-100 transition-all duration-300"
              />
              
          </div>
          <div className="w-full flex flex-col justify-center">
            <div className="p-4">
              <h1 className="text-md font-semibold">Notify</h1>
              <p className="text-muted-foreground text-xs line-clamp-3">
              Get real-time updates and alerts when collaborators make changes — stay in sync effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default NotificationCard;