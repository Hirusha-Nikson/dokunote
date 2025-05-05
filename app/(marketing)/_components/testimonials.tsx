"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FadeUp } from "@/components/fade-up";
import { Hash } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aisha Patel",
      role: "PhD Student, Cognitive Science",
      quote:
        "Dokunote has transformed the way I handle citations and research notes. It's like Notion, but smarter and built for academia.",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Liam Becker",
      role: "Lecturer, History Department",
      quote:
        "I recommend Dokunote to my students every semester. It's simple, reliable, and removes so much friction from writing.",
      image: "https://i.pravatar.cc/100?img=47",
    },
    {
      name: "Sophia Zhang",
      role: "UX Researcher & Master's Candidate",
      quote:
        "Finally, a note-taking app that actually understands how research works. I love the citation generation and real-time collaboration.",
      image: "https://i.pravatar.cc/100?img=58",
    },
    {
      name: "John Doe",
      role: "Software Engineer",
      quote:
        "Dokunote has streamlined my workflow and made note-taking a breeze.",
      image: "https://i.pravatar.cc/100?img=10",
    },
    {
      name: "Emily Rogers",
      role: "Postdoc, Linguistics",
      quote:
        "I use Dokunote daily for managing my research and collaborative projects. It just works.",
      image: "https://i.pravatar.cc/100?img=20",
    },
    {
      name: "Marcus Lin",
      role: "Research Assistant, Neuroscience",
      quote:
        "The real-time features make working with my team so much smoother. Highly recommended!",
      image: "https://i.pravatar.cc/100?img=21",
    },
    {
      name: "Anika Sharma",
      role: "MSc Data Science",
      quote:
        "Dokunote is intuitive and super helpful for my thesis. Love the reference management!",
      image: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Daniel Gomez",
      role: "Academic Writer",
      quote:
        "Perfect for organizing thoughts and keeping references tidy in one place.",
      image: "https://i.pravatar.cc/100?img=23",
    },
    {
      name: "Mei Tanaka",
      role: "PhD Candidate, Sociology",
      quote:
        "I’ve tried so many tools, but Dokunote is the only one built with academic workflows in mind.",
      image: "https://i.pravatar.cc/100?img=24",
    },
    {
      name: "Oliver Scott",
      role: "Graduate Student",
      quote:
        "Clean UI and powerful features. The citation generator saves me hours.",
      image: "https://i.pravatar.cc/100?img=25",
    },
    {
      name: "Clara Ivanov",
      role: "Ethnography Researcher",
      quote:
        "Dokunote helped me organize field notes efficiently. Collaboration was a bonus!",
      image: "https://i.pravatar.cc/100?img=26",
    },
    {
      name: "Ravi Menon",
      role: "CS Lecturer",
      quote:
        "This is a must-have for students in my courses. I even use it for my own research.",
      image: "https://i.pravatar.cc/100?img=27",
    },
  ];

  // Split testimonials into chunks of 6
  const chunkedTestimonials = testimonials.reduce((acc, _, i) => {
    if (i % 6 === 0) acc.push(testimonials.slice(i, i + 6));
    return acc;
  }, [] as typeof testimonials[]);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 items-center">
      <FadeUp duration={0.5} delay={0.6}>
        <div className="flex gap-1 items-center text-sky-500">
          <Hash className="size-3.5" />
          <span>Voices</span>
        </div>
        </FadeUp>
        <FadeUp duration={0.5} delay={0.8}>
        <h1 className="text-5xl font-bold flex flex-col text-center mb-4">
          <span>What Our Users Say</span>
        </h1>
        </FadeUp>
        <FadeUp duration={0.5} delay={0.9}>
          <p className="text-xs text-muted-foreground mb-8 text-center">Real feedback from researchers, students, and professionals who use Dokunote to think clearer, write faster, and cite smarter.</p>
        </FadeUp>

        <Carousel>
          <CarouselContent>
            {chunkedTestimonials.map((group, idx) => (
              <CarouselItem key={idx}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
                  {group.map((t, index) => (
                    <FadeUp key={index} duration={0.5} delay={index * 0.1}>
                    <div
                      key={index}
                      className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-700 transition transform hover:scale-[1.02] duration-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                            {t.name}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {t.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        {`“${t.quote}”`}
                      </p>
                    </div>
                    </FadeUp>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
