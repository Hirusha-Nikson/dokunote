import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    // Define documents table
    document: defineTable({
        title: v.string(),
        content: v.optional(v.string()),
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        organizationId: v.optional(v.string()),
    })

    .index("by_ownerId", ["ownerId"])
    .index("by_organizationId", ["organizationId"])
    .index("by_ownerId_and_org", ["ownerId", "organizationId"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["organizationId" , "ownerId"],
    }),

    
    // Define notes table
    notes: defineTable({
        documentId: v.id("document"),
        content: v.string(),
        ownerId: v.string(),
        team: v.boolean(),
        important: v.optional(v.union(
            v.literal("very-important"),
            v.literal("important"),
            v.literal("less-important"),
            v.literal("no-label"),
        )),
        organizationId: v.optional(v.string()),
        source: v.optional(v.string()),
        sourcetype: v.optional(v.string()),
      })
      .index("by_document", ["documentId"])
      .index("by_owner", ["ownerId"])
      .index("by_organization", ["organizationId"]),


    // Define pdfFiles table
    pdfFiles: defineTable({
        fileId:v.string(),
        documentId: v.id("document"),
        fileName: v.string(),
        storageId: v.string(),
        ownerId: v.string(),
        fileUrl: v.string(),
        organizationId: v.optional(v.string()),
    })
    .index("by_document", ["documentId"])
    .index("by_document_fileId", ["documentId", "fileId"])
    .index("by_owner", ["ownerId"])
    .index("by_organization", ["organizationId"]),


    // Documents table from LangChain for collect embedded pdf content 
    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
      })
      .vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
      }),

    
    // Define useMaterials table
    useMaterials: defineTable({
        document_Id: v.id("document"),
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
    })
    .index("by_note", ["note_id"]),



    // Define citations table
    citations: defineTable({
        documentId: v.id("document"),
        author: v.string(),
        date: v.string(),
        title: v.string(),
        source: v.string(),
        url : v.string(),
        citationContent: v.string(),
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
        ),  
        sourcetype: v.optional(v.string()),

    })
    .index("by_document", ["documentId"])

});


    