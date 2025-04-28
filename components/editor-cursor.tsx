'use client';

import { cn } from "@/lib/utils";

export const EditorCursor = () => {
    return (
        <div className={cn("inline-block w-[2px] h-[0.7em] bg-sky-500 relative animate-caret-blink ml-1")}>
            <div className="absolute -top-[1.6em] left-0">
                {/* <span className="text-xs bg-sky-500 px-1 rounded-r-xs text-white">Dokunote</span> */}
            </div>
        </div>
    );
};