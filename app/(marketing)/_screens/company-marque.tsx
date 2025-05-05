/* eslint-disable @next/next/no-img-element */
"use client";

import { FadeUp } from "@/components/fade-up";

const Comapnies = [
  {
    name: "Clerk",
    url: "https://www.datocms-assets.com/115132/1729180135-clerk-logo.png?ar64=MTox&auto=format&fit=crop",
    size: 12,
  },
  {
    name: "BlockNotes",
    url: "https://avatars.githubusercontent.com/u/125679560?v=4",
    size: 10,
  },
  {
    name: "Liveblocks",
    url: "https://www.finsmes.com/wp-content/uploads/2022/03/liveblocks.png",
    size: 10,
    rounded: "rounded-md",
  },
  {
    name: "Convex",
    url: "https://www.convex.dev/_next/image?url=https%3A%2F%2Fpleasant-albatross-666.convex.cloud%2Fapi%2Fstorage%2F51662301-1a43-400c-8052-f2375a185e56&w=1536&q=75",
    size: 10,
  },
  {
    name: "Gemini",
    url: "https://brandlogo.org/wp-content/uploads/2024/06/Gemini-Icon-300x300.png.webp",
    size: 12,
  },
  {
    name: "@shadcn",
    url: "https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/20161105/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png",
    size: 6,
    invert: "dark:invert invert-0",
  },
];
const CompanyMarque = () => {
  return (
    <div className="flex flex-col w-4/5 mx-auto p-8 my-12 h-[40vh] items-center justify-center gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-center font-semibold text-muted-foreground text-md">
        Powered by Modern Tech
        </p>
        <p className="text-center text-muted-foreground text-xs/relaxed">
        Dokunote is built with powerful open-source tools and technologies from innovative communities around the world.
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 mt-4 w-full items-center justify-center gap-4">
        {Comapnies.map((company, index) => (
          <FadeUp key={index} duration={0.5} delay={index * 0.2}>
          <div key={company.name} className="flex items-center justify-center md:border-r md:last:border-r-0 px-2">
          <img className={`size-${company.size} ${company.invert} ${company.rounded}`} key={company.name} src={company.url} alt="company" width={100} height={100}/>
          <p className="ml-3 text-md font-semibold hidden md:block">{company.name}</p>
          </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
};

export default CompanyMarque;
