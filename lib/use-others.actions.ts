"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"document">[]) {
    return await convex.query(api.documents.getNotificationsById, {ids});
};

export async function getUsers() {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.org_id as string],
    });

    const users = response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? "Anonymous",
        avatar: user.imageUrl,
        color: user.firstName ?? "Anonymous",
    }));

    return users;
}