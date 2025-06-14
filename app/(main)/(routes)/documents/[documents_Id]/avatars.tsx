"use client";

import Image from "next/image";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";

const AVATAR_SIZE =28;

export const Avatars = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack />
        </ClientSideSuspense>
    )
};

const AvatarStack = () => {
    const users = useOthers();
    const currentUser = useSelf();

    if (users.length === 0) return null;

    return (
        <div className="flex items-center">
            {currentUser && (
                <div className="relative ml-2">
                    <Avatar src={currentUser.info.avatar} name="You" />
                </div>
            )}
            <div className="flex">
                {users.map(({ connectionId, info }) =>
                {
                    return (
                        <Avatar key={connectionId} src={info.avatar} name={info.name}/>
                    )
                })}
            </div>
        </div>
    );
}


interface AvatarProps {
    src: string;
    name: string;
};

const Avatar = ({ src, name }: AvatarProps) => {
    return (
        <div 
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} 
            className="group -ml-2 flex shrink-0 place-content-center relative border-2 border-accent rounded-full"
        >
            <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 bg-foreground text-background text-xs rounded-lg mt-2.5 whitespace-nowrap transition-opacity duration-200">
                {name}
            </div>

            <Image
                src={src}
                alt={name}
                className="rounded-full object-cover"
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
            />

        </div>
    );
};