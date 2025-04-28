"use client";

import { useState } from "react";
import SubHeader from "../../_components/sub-header";
import { CitationsGenerator } from "./citation-generator";
import  CitationListPreview  from "./citation-list-preview";
import { Loader } from "lucide-react";

const CitationsPage = () => {

    const [isLaoding, setIsLoading] = useState(false);

    return ( 
        <>
        <SubHeader pageTitle="Citations"/>
        <div className="flex flex-col lg:w-2/3 w-5/6 overflow-hidden mt-[64px] mx-auto relative min-h-full">
        {isLaoding && (
          <div className="absolute inset-0 z-50 flex items-center justify-center  backdrop-blur-[4px] min-w-full min-h-full">
            <div className="flex flex-col items-center">
            <Loader className="size-8 animate-spin text-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Generating citations...</p>
            </div>
          </div>
        )}
        <CitationsGenerator setLoad={setIsLoading} />
        <CitationListPreview />
      </div>
        </>
     );
}
 
export default CitationsPage;