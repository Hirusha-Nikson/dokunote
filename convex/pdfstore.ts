import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addPdfEntry = mutation({
  args: {
    documentId: v.id("document"),  
    storageId: v.string(),
    fileName: v.string(),
    fileld: v.string(),
    ownerId: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const organizationId = user ? (user.organization_id ?? undefined) as | string | undefined : undefined;

    return await ctx.db.insert("pdfFiles", {
      fileId: args.fileld,
      documentId: args.documentId,
      storageId: args.storageId,
      fileName: args.fileName,
      ownerId: user.subject,
      fileUrl: args.fileUrl,
      organizationId: organizationId
    });
  },
});

export const getPdfFilesUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const getPdfFiles = query({
  args: {
    fileId: v.string(),
    documentId: v.id("document"), // Added documentId as an argument
  },
  handler: async (ctx, args) => {
    const getResult = await ctx.db
      .query("pdfFiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("fileId"), args.fileId), // Match fileId
          q.eq(q.field("documentId"), args.documentId) // Match documentId
        )
      )
      .collect();
    return getResult[0];
  },
});


export const getPdfFilesByDocumentId = query({
  args: {
    documentId: v.id("document"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    return await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("documentId"), args.documentId))
      .collect();
  },
});

//get fileName to noteContent 
export const getFileName = query({
  args: {
    documentId: v.id("document"),
    fileId: v.id("pdfFiles"),
  },
  handler: async (ctx, args) => {
    const pdf = await ctx.db.get(args.fileId);
    if (!pdf || pdf.documentId !== args.documentId) return null;
    return pdf;
  }
})


export const deletePdfFile = mutation({
  args: {
    fileId: v.string(),
    documentId: v.id("document"),
  },
  handler: async (ctx, args) => {
    const pdfFile = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .first();

    if (!pdfFile) {
      throw new Error("PDF file not found");
    }

    await ctx.storage.delete(pdfFile.storageId);

    await ctx.db.delete(pdfFile._id);

    const embaddedDocs = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field( "metadata"), args.documentId))
      .collect();

      for (const doc of embaddedDocs) {
        await ctx.db.delete(doc._id);
      }
  },
});
