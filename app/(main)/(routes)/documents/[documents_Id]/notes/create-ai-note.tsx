"use clinet";
import { useState } from "react";
import { useParams } from "next/navigation";

import { GoogleGenAI } from "@google/genai";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const CreateAINote = ({ onAiClose }: { onAiClose: () => void }) => {
  const params = useParams();
  const documents_Id = params?.documents_Id;

  const createAiNote = useMutation(api.notes.createNote);

  const [link, setLink] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [noteAiContent, setNoteAiContent] = useState("");

  const [isSummarizing, setIsSummarizing] = useState(false);

  const inputLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const onSummarizeClick = async () => {
    setIsSummarizing(true);

    setNoteAiContent("");

    const Prompt = `Summarize the following link: ${link}.
    Please include the main points, key takeaways, and any important details. The summary should be concise and easy to read. Use bullet points, and other markdown formatting as necessary (dont use # headers).`;

    // Simulate a summarization process
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-04-17",
      contents: Prompt,
    });
    for await (const chunk of response) {
      setNoteAiContent((prev) => prev + chunk.text);
    }

    setIsSummarizing(false);
  };

  const detectSourceType = (url: string): "web" | "book" | "journal" | "article" => {
    const lowerUrl = url.toLowerCase();
  
    if (lowerUrl.includes("wikipedia.org")) return "web";
    if (lowerUrl.includes("books.google")) return "book";
    if (lowerUrl.includes("books")) return "book";
    if (lowerUrl.includes("doi.org") || lowerUrl.includes("jstor.org") || lowerUrl.includes("springer.com") || lowerUrl.includes("sciencedirect.com")) {
      return "journal";
    }
    if (
      lowerUrl.includes("medium.com") ||
      lowerUrl.includes("substack.com") ||
      lowerUrl.includes("blog") ||
      lowerUrl.includes("article")
    ) {
      return "article";
    }
    return "web"; // default fallback
  };
  

  const onCreateAiNote = (content: string) => {
    setIsCreating(true);
    createAiNote({
      id: documents_Id as Id<"document">,
      content,
      source: link,
      important: "no-label",
      sourcetype: detectSourceType(link),
    })
      .then(() => {
        toast.success("Note created successfully!");
      })
      .finally(() => {
        onAiClose();
        setIsCreating(false);
      });
  };

  return (
    <div className="flex flex-col mt-4 w-full mx-auto animate-in fade-in-0 duration-300">
      <Card>
        <CardHeader>
          <CardTitle>Write a Note</CardTitle>
          <CardDescription>
            You can create a note for your document here for further uses. Also
            you can share your notes with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-center gap-2.5">
            <Input
              value={link}
              placeholder="Paste Wikipedia or article link..."
              type="url"
              accept="url"
              className="text-sky-600"
              onChange={inputLink}
            />
            <Button
              variant="dokunote"
              onClick={onSummarizeClick}
              disabled={isSummarizing || link.length === 0}
            >
              Summarize
            </Button>
          </div>
        </CardContent>
        <CardContent>
          {isSummarizing && !noteAiContent ? (
           <div className="flex flex-col gap-2 p-2">
           <Skeleton className="h-3 w-full" />
           <Skeleton className="h-3 w-2/3" />
         </div>
          ) : (null)
          }
          <MarkdownPreview 
          source={noteAiContent} 
          className="py-2 bg-transparent"
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            color: "var(--foreground)",
          }}
          />

        </CardContent>
        <CardFooter className="flex justify-end items-center gap-2">
          <Button variant="outline" onClick={onAiClose}>
            Cancel
          </Button>
          <Button
            variant="dokunote"
            onClick={() => {
              onCreateAiNote(noteAiContent);
            }}
            disabled={isCreating || isSummarizing || noteAiContent.length === 0}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
