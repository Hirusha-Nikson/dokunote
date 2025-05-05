"use client";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";


//Creating a document
export const createDocument = mutation({
  args: { title: v.optional(v.string()), content: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const organizationId = user ? (user.organization_id ?? undefined) as | string | undefined : undefined;

    if (organizationId){
      return await ctx.db.insert("document", {
        title: args.title ?? "Untitled Document",
        ownerId: user.subject,
        content: args.content, 
        organizationId: organizationId,
      });
    }

    return await ctx.db.insert("document", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      content: args.content, 
    });
  },

});

//Update Content of a document By Id
export const updateDocumentContentById = mutation({
  args: { id: v.id("document"), content: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.db.get( args.id);

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner || !organizationId) {
      throw new ConvexError("Not authorized");
    }

    return await ctx.db.patch(args.id, { content: args.content });
  },
});

//Delete a document By Id
export const deleteDocument = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    
    const document = await ctx.db.get( args.id);
    
    if (!document) {
      throw new ConvexError("Document not found");
    }
    
    const isOwner = document.ownerId === user.subject;
    
    if (!isOwner) {
      throw new ConvexError("Not authorized");
    }

    // Delete all notes related to this document
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_document", (q) => q.eq("documentId", args.id))
      .collect();

    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    // Delete all pdfFiles related to this document
    const files = await ctx.db
      .query("pdfFiles")
      .withIndex("by_document", (q) => q.eq("documentId", args.id))
      .collect();

    for (const file of files) {
      await ctx.db.delete(file._id);
    }

 
    return await ctx.db.delete(args.id);
  },
});

//Get all documents to the Workspace Home Pagination
export const getDocumentsPaginate = query({
  args: { paginationOpts: paginationOptsValidator,  search: v.optional(v.string()) },
  handler: async (ctx, {search, paginationOpts}) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return {
        page: [],  // Empty page
        isDone: true,  // No more pages
        continueCursor: "",  // Empty cursor to align with the type
      };
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    if (search && organizationId) {
      return await ctx.db.query("document")
      .withSearchIndex("search_title", (q) => q.search("title" ,search)
      .eq("organizationId", organizationId)
    )
    .paginate(paginationOpts);
    }

    else if(search) {
      return await ctx.db.query("document")
      .withSearchIndex("search_title", (q) => q.search("title" ,search)
      .eq("ownerId", user.subject)
    )
    .paginate(paginationOpts);
    }


    if(organizationId && user){
      return await ctx.db.query("document")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", organizationId)) 
      .paginate(paginationOpts);
    }

    return await ctx.db.query("document")
    .withIndex("by_ownerId", (q) => q.eq("ownerId", user.subject)) 
    .paginate(paginationOpts);
  
  }
});

//Get documents by the userId
export const getDocumentsByUser = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return {
        page: [],  // Empty page
        isDone: true,  // No more pages
        continueCursor: "",  // Empty cursor to align with the type
      };
    }

    const allDocs = await ctx.db
      .query("document")
      .withIndex("by_ownerId", (q) =>
        q.eq("ownerId", user.subject)
      )
      .collect();

      const personalDocs = allDocs.filter((doc) => doc.organizationId === undefined);

      return personalDocs;
  
  }
});

//Get documents by the organization
export const getDocumentsByOrganization = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return {
        page: [],  // Empty page
        isDone: true,  // No more pages
        continueCursor: "",  // Empty cursor to align with the type
      };
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    if(!organizationId) return [];

    return await ctx.db
      .query("document")
      .withIndex("by_organizationId", (q) =>
        q.eq("organizationId", organizationId)
      )
      .collect();
    
  }
});

//Get document by Id
export const getDocumentById = query({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = user.organization_id ?? undefined;

    // Check if the user is authorized to access the document
    const isOwner = document.ownerId === user.subject;
    const isInOrganization = document.organizationId === organizationId;

    if (!isOwner && !isInOrganization) {
      throw new ConvexError("Not authorized");
    }

    return document;
  },
});

//Get document by Id for LiveBlocks API inegrations
export const getById = query({
  args: { id: v.id("document") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  }
});

//Rename a document
export const updateDocument = mutation({
  args: { id: v.id("document"), title:v.string(), content: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const document = await ctx.db.get( args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError("Not authorized");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});

//Get Notifications
export const getNotificationsById = query({
  args: { ids: v.array(v.id("document")) },
  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({id: document._id, name:document.title});
      } else {
        documents.push({id: id, name:"Document not found"});
      }
    }
    return documents;
  }
});

//Get documents count
export const getDocumentsCount = query({
  handler: async (ctx) => {
    return await ctx.db.query("document").collect();
  }
});

export const getOrganizationStats = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("document").collect();

    // Get all organization IDs (non-empty ones)
    const orgIds = docs
      .map(doc => doc.organizationId)
      .filter(id => id && id !== "");

    // Use a Set to get unique IDs
    const uniqueOrgIds = Array.from(new Set(orgIds));

    return {
      totalDocuments: docs.length,
      totalOrgProjects: orgIds.length,
      uniqueOrgs: uniqueOrgIds.length,
    };
  },
});
