"use client";

import { FadeUp } from "@/components/fade-up";
import { useRive } from "@rive-app/react-canvas";
import { AtSign, Hash, MessageSquareText, Users2 } from "lucide-react";
import { useEffect, useState } from "react";

const cards = [
  {
    color: "bg-amber-500",
    gradient: "from-amber-500 via-amber-300 to-background to-90%",
    animation: "collab",
    title: "Collaborative editing",
    desc: "Eneble team members to edit documents simultaneously.",
    icon: <Users2 className="size-5" />,
  },
  {
    color: "bg-rose-500",
    gradient: "from-rose-500 via-rose-300 to-background to-90%",
    animation: "mention",
    title: "Inline mentions",
    desc: "Allow users to mention collaborators in documents.",
    icon: <AtSign className="size-5" />,
  },
  {
    color: "from-green-500 to-green-500",
    gradient: "from-green-500 via-green-300 to-background to-90%",
    animation: "comment",
    title: "Comments",
    desc: "Leave in-context comments and feedback on documents.",
    icon: <MessageSquareText className="size-5" />,
  },
];


export default function DetailsScreen() {
  const [index, setIndex] = useState(0);

  const { RiveComponent, rive } = useRive({
    src: "/editoranimation (6).riv",
    autoplay: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Use a ref to track if the component is mounted
    const isMounted = { current: true };

    if (!rive) return;

    try {
      rive.stop();
      // Only attempt to play if component is mounted
      if (isMounted.current) {
        rive.play(cards[index].animation);
      }
    } catch (err) {
      console.warn("Rive animation error:", err);
    }

    // Cleanup function: Stop the animation when the component unmounts
    return () => {
      // When unmounting, set isMounted.current to false
      isMounted.current = false;
      if (rive) {
        rive.stop(); // Stop the animation
      }
    };
  }, [rive, index]);
  const currentCard = cards[index];

  return (
    <div className="relative w-full min-h-screen grid grid-rows-5 md:grid-rows-12 my-48">
      {/* Background Gradient Blur */}
      <div
        className={`absolute w-[80vw] h-[70vh] bg-radial-[at_50%_20%] ${currentCard.gradient} opacity-30 dark:opacity-10 rounded-full blur-[200px] transition-colors ease-in-out duration-1000`}
      ></div>

      <div className="row-span-1 flex flex-col w-full items-center md:row-span-2 my-4">
        <FadeUp duration={0.5} delay={0.6}>
        <div className="flex gap-1 items-center text-sky-500">
          <Hash className="size-3.5" />
          <span>Built for Collaboration</span>
        </div>
        </FadeUp>
        <FadeUp duration={0.5} delay={0.8}>
        <h1 className="text-5xl font-bold flex flex-col text-center">
          <span>Think as One.</span> <span>Write as a Team.</span>
        </h1>
        </FadeUp>
      </div>

      {/* Top Row: Rive Animation */}
      <div className="row-span-2 md:row-span-7 flex justify-center items-center relative">
        <div className="w-[calc(100%-2rem)] md:w-2/3 h-full bg-background/90 backdrop-blur-2xl flex justify-center items-center border">
          <RiveComponent className="w-full h-full invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0" />
        </div>
      </div>

      {/* Bottom Row: 3 Columns with Top Progress Border */}
      <div className="row-span-2 md:row-span-3 grid grid-cols-1 md:grid-cols-3 border-t md:w-2/3 w-[calc(100%-2rem)] mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative h-full flex flex-col justify-center items-center border"
          >
            {/* Top Progress Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-card">
              <div
                className={`h-full ${i === index ? `bg-gradient-to-r ${card.color}` : "bg-gray-500 opacity-30"} transition-all duration-[5200ms]`}
                style={{
                  width: i === index ? "100%" : "0%",
                }}
              ></div>
            </div>

            {/* Content */}
            <div className="p-4">
              {card.icon}
              <p className="text-lg font-medium">{card.title}</p>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
