"use client";

import Image from "next/image";

const CompanyMarque = () => {
  return (
    <div className="flex flex-col w-4/5 mx-auto p-8 my-8">
      <div className="flex flex-col gap-2">
        <p className="text-center font-semibold text-muted-foreground text-md">
          Technology Behind the Scenes
        </p>
        <p className="text-center text-muted-foreground text-xs/relaxed">
          This project was built using powerful technologies and open tools
          contributed by brilliant communities and creators.
        </p>
      </div>
      <div className="flex flex-cols-6 mt-4 w-full justify-between">
        <div>
          <Image
            src={"https://www.blocknotejs.org/img/logos/banner.svg"}
            alt="nextjs"
            width={160}
            height={160}
            className="grayscale"
          />
        </div>
        <div className="">
        <h1 className="text-2xl">Clerk</h1>
        </div>
        <div>
          <h1 className="text-2xl">LiveBlocks</h1>
        </div>
        <div>
        <h1 className="text-2xl">Tailwind</h1>
        </div>
        <div>
        <h1 className="text-2xl">Gemini</h1>
        </div>
        <div>
        <h1 className="text-2xl">Convex</h1>
        </div>
      </div>
    </div>
  );
};

export default CompanyMarque;
