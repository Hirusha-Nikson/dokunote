"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { GoogleGenAI } from "@google/genai";
import { ConvexHttpClient } from "convex/browser";

import { citationContent } from "@/types/citation";

import {
  formatAPA,
  formatMLA,
  formatNLM,
  formatIEEE,
  formatChicago,
  formatHarvard,
  formatVancouver,
  formatHarvardAustralia,
} from "@/lib/formatting-cites.action";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateCitations(
  documentId: Id<"document">,
  citationFormat: string
) {
  const materials = await convex.query(
    api.useMaterials.getMaterialsByDocumentId,
    { documentId }
  );

  const existingCitations = await convex.query(
    api.citations.getCitationsByDocumentId,
    { documentId }
  );

  for(const citation of existingCitations) {
    await convex.mutation(api.citations.removeCitation, { citationId: citation._id });
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  for (const material of materials) {
    if (material.source && material.sourcetype) {
      const prompt = `
Extract the citation information from the following source in JSON format:
Source: "${material.source}" (Type: ${material.sourcetype})
Return only a JSON object with these keys:
- author
- date
- title
- source
- url

Do not include any explanation or formatting text. Return only the JSON.
If can not find the date in the source, return null.
author and title can not be null.
`;

      try {
        const response = await ai.models.generateContentStream({
          model: "gemini-2.5-flash-preview-04-17",
          contents: prompt,
        });

        let citations = "";
        for await (const chunk of response) {
          citations += chunk.text;
        }

        if (citations.trim()) {
          // Clean and parse JSON
          const cleanedJson = citations.trim().replace(/^```json|```$/g, "").trim();
          const citationJSON: citationContent = JSON.parse(cleanedJson);

          if (!citationJSON.date) {
            const currentYear = new Date().getFullYear().toString();
            citationJSON.date = currentYear;
          }

          // Format based on selected format
          let formattedCitation = "";
          switch (citationFormat) {
            case "APA6":
            case "APA7":
              formattedCitation = formatAPA(citationJSON);
              break;
            case "MLA":
              formattedCitation = formatMLA(citationJSON);
              break;
            case "NLM":
              formattedCitation = formatNLM(citationJSON);
              break;
            case "IEEE":
              formattedCitation = formatIEEE(citationJSON);
              break;
            case "Chicago":
              formattedCitation = formatChicago(citationJSON);
              break;
            case "Harvard":
              formattedCitation = formatHarvard(citationJSON);
              break;
            case "Harvard-Australia":
              formattedCitation = formatHarvardAustralia(citationJSON);
              break;
            case "Vancouver":
              formattedCitation = formatVancouver(citationJSON);
              break;
            default:
              // fallback if needed
              formattedCitation = formatAPA(citationJSON);
          }
          
          
          // Insert citation into database
          await convex.mutation(api.citations.createCitation, {
            document_id: documentId,
            citationContent: formattedCitation,
            author: citationJSON.author,
            date: citationJSON.date,
            title: citationJSON.title,
            source: material.source,
            url: citationJSON.url,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            citationFormat: citationFormat as any,
            sourcetype: material.sourcetype,
          });
        }
      } catch (err) {
        console.error("Error generating citation from Gemini:", err);
      }
    }
  }

  return true;
}
