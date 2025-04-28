"use client";
import { mutation, query} from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const CreateMaterials = mutation({
    args: {
        id: v.id("document"),
        note_id: v.id("notes"),
        materialContent: v.string(),
        source: v.optional(v.string()),
        sourcetype: v.optional(v.string()),
        important: v.optional(v.union(
            v.literal("very-important"),
            v.literal("important"),
            v.literal("less-important"),
            v.literal("no-label"),
        )),
        organizationId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = user ? (user.organization_id ?? undefined) as | string | undefined : undefined;

        return await ctx.db.insert("useMaterials", {
            document_Id: args.id,
            note_id: args.note_id,
            materialContent: args.materialContent,
            source: args.source,
            sourcetype: args.sourcetype,
            important: args.important,
            organizationId: organizationId,
        });
    },
});

export const getMaterialsByDocumentId = query({
    args: {
        documentId: v.id("document"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("useMaterials")
        .filter(q => q.eq(q.field("document_Id"), args.documentId))
        .collect();
    },
});

export const removeMaterials = mutation({
    args: {
        id: v.id("useMaterials"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});

export const updateMaterials = mutation({
    args: {
        id: v.id("notes"),
        color: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.id, {
            important: args.color as "very-important" | "important" | "less-important" | "no-label",
        });
    },
});
