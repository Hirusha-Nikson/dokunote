"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { NotepadText, Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GoogleGenAI } from "@google/genai";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

import MarkdownPreview from '@uiw/react-markdown-preview';

export const ChatPromptPage = () => {
  return (
    <div className="flex flex-col p-4 justify-evenly border-r">
      <div>
        <PromptInput />
      </div>
    </div>
  );
};

export const PromptInput = () => {
  const { pdfId } = useParams();

  const params = useParams();
  const documents_Id = params?.documents_Id;

  const createNotes = useMutation(api.notes.createNote);

  const [isCreating, setIsCreating] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (responseText) {
        setNoteContent(responseText);
    }
  }, [responseText]);

  const onNoteSubmit = (content: string) => {
    setIsCreating(true);
    createNotes({
      id: documents_Id as Id<"document">,
      content,
      source:  pdfId as string,
      sourcetype: "pdf" })
      .then(() => {
        toast.success("Note created successfully!");
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  const searchAi = useAction(api.myActions.search);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    // Send the input value to the server or handle it as needed
    const resultAi = await searchAi({
      query: inputValue,
      fileId: pdfId as string,
    });

    const unformattedResult = JSON.parse(resultAi);

    let answer = "";

    if (unformattedResult) {
      (unformattedResult as Array<{ pageContent: string }>).forEach(
        (item: { pageContent: string }) => {
          answer = answer + item.pageContent;
        }
      );
    }

    const Prompt =
      "For question :" +
      inputValue +
      " and with the given content as answer," +
      " please provide an appropriate response in Markdown format (do not use # headers only use bold). The answer content is: " +
      answer;

    setResponseText("");

    setIsLoading(true);

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-04-17",
      contents: Prompt,
    });
    for await (const chunk of response) {
      setResponseText((prev) => prev + chunk.text);
      console.log(chunk.text);
    }

    setIsLoading(false);

    setInputValue(""); // Clear after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {isLoading && (
        <div className="flex flex-col gap-2 p-2 mt-6">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      )}
      {responseText && !isLoading ? (
        <Card>
          <CardContent>
            <MarkdownPreview
              source={responseText} 
              className="py-2"
              style={{
                backgroundColor: "transparent",
              }}
              />
            <textarea
              typeof="text/plain"
              readOnly
              onChange={(e) => setNoteContent(e.target.value)}
              value={noteContent}
              className="w-full resize-none hidden border-0 focus-visible:ring-0 focus-visible:outline-none shadow-none max-h-80 min-h-80 bg-transparent"
            ></textarea>
          </CardContent>
          <CardContent className="flex gap-2.5 items-end justify-end">
            <Button
              title="Add to notes"
              disabled={isCreating}
              onClick={() => onNoteSubmit(noteContent)}
            >
              <NotepadText />
            </Button>
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardContent className="flex gap-2.5 items-end">
          <textarea
            ref={textareaRef}
            placeholder="Ask me anything about this document..."
            rows={1}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleInput();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full border-0 focus-visible:ring-0 focus-visible:outline-none shadow-none overflow-hidden max-h-48 min-h-12 resize-none bg-transparent"
          />

          <Button
            variant={"outline"}
            className="rounded-md flex items-center justify-center group/send"
            onClick={handleSend}
            disabled={isLoading || inputValue.trim() === ""}
            title="Ask AI"
          >
            <Send className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};