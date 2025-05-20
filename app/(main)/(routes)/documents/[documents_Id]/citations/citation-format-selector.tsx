"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Id } from "@/convex/_generated/dataModel";
import { generateCitations } from "@/lib/generate-cites.action";
import { CommandEmpty } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CitationFormatSelectorProps {
  id: Id<"document">;
  setLoading: (loading: boolean) => void;
}

const citationFormats = [
    {
      format: "APA6",
      label: "APA6",
    },
    {
      format: "APA7",
      label: "APA7",
    },
    {
      format: "MLA",
      label: "MLA",
    },
    {
      format: "NLM",
      label: "NLM",
    },
    {
      format: "IEEE",
      label: "IEEE",
    },
    {
      format: "Chicago",
      label: "Chicago",
    },
    {
      format: "Harvard",
      label: "Harvard",
    },
    {
      format: "Harvard-Australia",
      label: "Harvard-Australia",
    },
    {
      format: "Vancouver",
      label: "Vancouver",
    },
  ];

export const CitationFormatSelector = ({ id, setLoading }: CitationFormatSelectorProps) => {
  const [format, setFormat] = useState("");
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenarateCitation = async () => {
    setLoading(true);
  try {
    await generateCitations(id, format);
    toast.success(`Citations generated in ${format} format!`);
  } catch (error) {
    console.error("Error generating citations:", error);
    toast.error("Failed to generate citations. Please try again.");
  }
  setLoading(false);
  };


  return (
    <div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {format
            ? citationFormats.find((citationFormats) => citationFormats.format === format)?.label
            : "Select a citation format..."}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
            <CommandInput placeholder="Search citation format..." />
          <CommandList>
            <CommandEmpty>No citation formats found.</CommandEmpty>
            <CommandGroup>
              {citationFormats.map((citationFormat) => (
                <CommandItem
                  key={citationFormat.format}
                  value={citationFormat.format}
                  onSelect={() => {
                    setFormat(citationFormat.format);
                    setOpen(false);
                    toast.message(`Citations generated in ${citationFormat.label} format!`);
                  }} >
                    <Check
                      className={format === citationFormat.format ? "opacity-100" : "opacity-0"}
                      size={16}
                    />
                    {citationFormat.label}
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <Button
      onClick={handleGenarateCitation}
      disabled={!format}
      className="ml-2"
      >
        Generate
      </Button>
    </div>
  );
};
