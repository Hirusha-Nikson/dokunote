"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";



interface LinksDialogProps {
  children: React.ReactNode;
}

export const LinksDialogScreen = ({ children }: LinksDialogProps) => {

  const [link, setLink] = useState("");

  const [summary, setSummary] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const inputLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSummarize = async () => {
    setIsLoading(true);

    setSummary("");

    const Prompt = `Summarize the following link: ${link}`;

    // Simulate a summarization process
    const ai = new GoogleGenAI({
          apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        });
    
        const response = await ai.models.generateContentStream({
          model: "gemini-2.5-flash-preview-04-17",
          contents: Prompt,
        });
        for await (const chunk of response) {
          setSummary((prev) => prev + chunk.text);
        }
    setIsLoading(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (isOpen) {
        setOpen(true);
      }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent style={{ maxWidth: "80%" }}>
        <DialogHeader>
          <DialogTitle>Quick Links</DialogTitle>
          <DialogDescription>
            Paste a link to summarize and create a note.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            value={link}
            placeholder="Paste Wikipedia or article link..."
            type="url"
            accept="application/pdf"
            className="text-sky-600"
            onChange={inputLink}
          />
          <Button variant="dokunote" onClick={() => handleSummarize()} disabled={isLoading}>
            Summarize
          </Button>
        </div>

        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          readOnly
          className="w-full h-80 mt-2"
          placeholder="Summary will appear here..."
        />

        <DialogFooter>
          <DialogClose asChild>
          <Button variant="outline" className="mt-4" type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          </DialogClose>
          <Button variant="dokunote" className="mt-4" type="button">
            Create a note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
