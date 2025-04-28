"use client";

import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

//Create a note 
export const createNote = mutation({
    args: { id: v.id("document"), content: v.string(), team: v.optional(v.boolean()), source: v.optional(v.string()), sourcetype: v.optional(v.string()), important: v.optional(v.union(
        v.literal("very-important"),
        v.literal("important"),
        v.literal("less-important"),
        v.literal("no-label"),
    ))},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
    
        if (!user) {
        throw new ConvexError("Not authenticated");
        }

        const organizationId = user ? (user.organization_id ?? undefined) as | string | undefined : undefined;
    
        return await ctx.db.insert("notes", {
        content: args.content,
        documentId: args.id,
        ownerId: user.subject,
        organizationId: organizationId,
        team: args.team ?? false,
        source: args.source,
        sourcetype: args.sourcetype,
        important: args.important
        });
    },
});

// Get all notes by document id
export const getNotesByDocumentId = query({
    args: { documentId: v.id("document") },
    handler: async (ctx, args) => {
      const user = await ctx.auth.getUserIdentity();
  
      if (!user) {
        throw new ConvexError("Not authenticated");
      }
  
      const organizationId = user.organization_id ?? undefined;
      const document = await ctx.db.get(args.documentId);
  
      if (!document) {
        throw new ConvexError("Document not found");
      }
  
      if (document.organizationId !== organizationId) {
        throw new ConvexError("Access denied to this document");
      }
  
      const notes = await ctx.db
        .query("notes")
        .filter(q =>
          q.and(
            q.eq(q.field("documentId"), args.documentId),

              q.eq(q.field("ownerId"), user.subject),
              q.eq(q.field("team"), false)
            
          )
        )
        .collect();
  
      return notes;
    }
  });

  // Toggle team status for a note
export const toggleTeamStatus = mutation({
  args: { noteId: v.id("notes"), team: v.boolean() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new ConvexError("Note not found");
    }

    if (note.ownerId !== user.subject) {
      throw new ConvexError("You don't have permission to update this note");
    }

    return await ctx.db.patch(args.noteId, {
      team: args.team,
    });
  },
});

// Get shared (team = true) notes by document ID
export const getSharedNotesByDocumentId = query({
  args: { documentId: v.id("document") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const organizationId = user.organization_id ?? undefined;

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    if (document.organizationId !== organizationId) {
      throw new ConvexError("Access denied to this document");
    }

    const notes = await ctx.db
      .query("notes")
      .filter(q =>
        q.and(
          q.eq(q.field("documentId"), args.documentId),
          q.eq(q.field("team"), true)
        )
      )
      .collect();

    return notes;
  }
});

// Delete note
export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if(!user) {
      throw new ConvexError("Not authenticated");
    }

    const note = await ctx.db.get(args.noteId);

    if(!note) {
      throw new ConvexError("Note not found");
    }

    if(note.ownerId !== user.subject) {
      throw new ConvexError("You don't have permission to delete this note");
    }

     // Delete all useMaterials related to this document
     const materials = await ctx.db
     .query("useMaterials")
     .withIndex("by_note", (q) => q.eq("note_id", args.noteId))
     .collect();

   for (const material of materials) {
     await ctx.db.delete(material._id);
   }

    return await ctx.db.delete(args.noteId);

  }
});

//  Toggle label color
export const toggleLabelColor = mutation({
  args: { noteId: v.id("notes"), color: v.string() },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new ConvexError("Note not found");
    }

    // Update the note
    await ctx.db.patch(args.noteId, {
      important: args.color as "very-important" | "important" | "less-important" | "no-label",
    });

    // Find materials linked to this note and update them too
    const materials = await ctx.db
      .query("useMaterials")
      .withIndex("by_note", (q) => q.eq("note_id", args.noteId))
      .collect();

    for (const material of materials) {
      await ctx.db.patch(material._id, {
        important: args.color as "very-important" | "important" | "less-important" | "no-label",
      });
    }

    return { success: true };
  },
});


