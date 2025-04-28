import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

//Create a citation
export const createCitation = mutation({
    args: {
        document_id: v.id("document"),
        author: v.string(),
        date: v.string(),
        title: v.string(),
        url: v.string(),
        citationContent: v.string(),
        source:v.string(),
        sourcetype: v.optional(v.string()),
        citationFormat: v.union(
            v.literal("APA6"),
            v.literal("APA7"),
            v.literal("MLA"),
            v.literal("NLM"),
            v.literal("IEEE"),
            v.literal("Chicago"),
            v.literal("Harvard"),
            v.literal("Harvard-Australia"),
            v.literal("Vancouver"),
        )
    },
    handler: async (ctx, args) => {

        if (!args.document_id) {
            throw new ConvexError("Document not found");
        }

        return await ctx.db.insert("citations", {
            documentId: args.document_id,
            author: args.author,
            date: args.date,
            title: args.title,
            source: args.source,
            url: args.url,
            citationContent: args.citationContent,
            sourcetype: args.sourcetype,
            citationFormat: args.citationFormat as "APA6" | "APA7" | "MLA" | "NLM" | "IEEE" | "Chicago" | "Harvard" | "Harvard-Australia" | "Vancouver",
        });
    }
});

//get all citations by document id
export const getCitationsByDocumentId = query({
    args: { documentId: v.id("document") },
    handler: async (ctx, args) => {
        if (!args.documentId) {
            throw new ConvexError("Document not found");
        }
        return await ctx.db
        .query("citations")
        .filter(q => q.eq(q.field("documentId"), args.documentId))
        .collect();
    }
});

//Remove citation
export const removeCitation = mutation({
    args: { citationId: v.id("citations") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.citationId);
    }
});