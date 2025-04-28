"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getNoteOwner(ownerId: string) {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();
    
    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.org_id as string],
    });
    
    const users = response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? "Anonymous",
        avatar: user.imageUrl,
    }));
    
    const noteowner = users.find(user => user.id === ownerId)?.name ?? "Unknown";

    return noteowner;
}