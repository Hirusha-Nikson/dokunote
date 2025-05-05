"use client";

import { FadeUp } from "@/components/fade-up";
import NoteCard from "../_components/_solution_cards/create-note";
import OrganizationCard from "../_components/_solution_cards/organization-card";
import { BookOpen, Hash, ReplaceAll, Sparkles } from "lucide-react";

const cards = [
  {
    component: <Sparkles className="size-8 stroke-sky-500"/>,
    topic: "Generate Smart AI Notes",
    description: "Create clean, structured notes from summarized content or URLs, ready to support your document writing process.",
  },
  {
    component: <BookOpen className="size-8 stroke-sky-500"/>,
    topic: "Understand Your Sources",
    description: "Summarize PDFs or extract insights from links using built-in AI tools — fast, accurate, and tailored to your needs.",
  },
  {
    component: <ReplaceAll className="size-8 stroke-sky-500" />,
    topic: " Cite Automatically",
    description:"Get instant, properly formatted citations in APA, MLA, Harvard, Chicago, and more — no manual work needed.",
  },
]

const SolutionsBentoGrid = () => {
  return (
    <div className="mx-auto flex flex-col w-full justify-center items-center py-8 min-h-[150vh] my-16">
      <div className="grid grid-rows-1 md:grid-rows-5 min-h-full gap-12 md:w-2/3 w-5/6">

      <div className="md:row-span-1 flex flex-col gap-2 items-center">
      <FadeUp duration={0.5} delay={0.6}>
        <div className="flex gap-1 items-center text-sky-500">
          <Hash className="size-3.5" />
          <span>How it works</span>
        </div>
        </FadeUp>
        <FadeUp duration={0.5} delay={0.8}>
        <h1 className="text-5xl font-bold flex flex-col text-center">
          <span>You Create,</span> <span>We Automate.</span>
        </h1>
        </FadeUp>

        <FadeUp duration={0.5} delay={0.8}>
        <div className="flex gap-1 items-center text-sky-500 mt-4">
          <Hash className="size-3.5" />
          <span>What You Focus On</span>
        </div>
        </FadeUp>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-5 h-full gap-4 md:row-span-2 ">
          <div className="md:col-span-2">
            <div className="h-full w-full flex flex-col">
              <OrganizationCard />
            </div>
          </div>
          <div className="md:col-span-3 w-full min-h-[16rem] md:h-full">
            <NoteCard />
          </div>
        </div>

        <div className="row-span-2 w-full ">
        <FadeUp duration={0.5} delay={0.8}>
        <div className="flex gap-1 items-center text-sky-500 w-full justify-center my-6">
          <Hash className="size-3.5" />
          <span>What Dokunote Handles for You</span>
        </div>
        </FadeUp>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 h-full">
            {cards.map((card, index) => (
              <FadeUp key={index} duration={0.5} delay={index * 0.2}>
              <div key={card.topic} className="w-full h-full flex flex-col justify-center items-center gap-6 border-x">
              <div className="size-24 rounded-full bg-accent/20 shadow-neutral-400 dark:shadow-neutral-600 shadow-xs flex justify-center items-center ">
                {card.component}
              </div>
              <div className="text-center w-2/3 flex flex-col justify-center items-center gap-2">
                <h1 className="font-semibold text-md">{card.topic}</h1>
                <p className="text-muted-foreground text-xs">{card.description}</p>
              </div>
            </div>
            </FadeUp>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsBentoGrid;
