"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { CitationFormatSelector } from "./citation-format-selector";

export const CitationsGenerator = ({setLoad} : {setLoad: (loading: boolean) => void}) => {

  const params = useParams();
  const documentId = params.documents_Id;

  const materials =  useQuery(api.useMaterials.getMaterialsByDocumentId,{
    documentId: documentId as Id<"document">
  });
  const filteredMaterials = materials?.filter((material) => material.source);
  
  const veryImportant = filteredMaterials?.filter((material) => material.important === "very-important");
  const important = filteredMaterials?.filter((material) => material.important === "important");
  const lessImportant = filteredMaterials?.filter((material) => material.important === "less-important");
  const noLabel = filteredMaterials?.filter((material) => material.important === "no-label");


    return (
        <div className="flex flex-col mt-4 w-full mx-auto">
      <div className="flex w-full flex-col md:flex-row items-center justify-between border border-muted rounded-2xl">
        
        <div className="flex flex-col w-full p-4 space-y-2">
           <h1 className="font-semibold">Create Cites for {filteredMaterials?.length} materials</h1>

           <p className="text-sm text-muted-foreground">You can create a citation for each material. Select a citation format and click generate.</p>

          
            <div className="grid grid-cols-4 w-full gap-2">
            {veryImportant?.length !== 0 && (
              <div className="w-full rounded-md overflow-hidden">
                <div className="h-2 bg-red-500"></div>
                <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-t from-transparent to-red-500/10">
                <p className="text-xs text-muted-foreground">very imp</p>
                <p className="text-sm">{veryImportant?.length}</p>
                </div>
              </div>
            )}
           
              
            {important?.length !== 0 && (
              <div className="w-full rounded-md overflow-hidden">
                <div className="h-2 bg-amber-500 border"></div>
                <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-t from-transparent to-amber-500/10">
                <p className="text-xs text-muted-foreground">important</p>
                <p className="text-sm">{important?.length}</p>
                </div>
              </div>
            )}

              
            {lessImportant?.length !== 0 && (
              <div className="w-full rounded-md overflow-hidden">
                <div className="h-2 bg-green-500"></div>
                <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-t from-transparent to-green-500/10">
                <p className="text-xs text-muted-foreground">less imp</p>
                <p className="text-sm">{lessImportant?.length}</p>
                </div>
              </div>
            )}
              

            {noLabel?.length !== 0 && (
              <div className="w-full rounded-md overflow-hidden ">
              <div className="h-2 bg-blue-600 grayscale"></div>
              <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-t from-transparent to-blue-500/10 grayscale">
              <p className="text-xs text-muted-foreground">normal</p>
              <p className="text-sm">{noLabel?.length}</p>
              </div>
            </div>
            )}
              
      </div>
            
        </div>
        {filteredMaterials?.length === 0 ? (
          <div className="flex items-center justify-center w-full my-4">
            <p className="text-xs text-center text-muted-foreground">No materials found</p>
          </div>
        ): (
          <div className="flex items-center justify-end w-full p-4 gap-2"> 
            
          <CitationFormatSelector id={documentId as Id<"document">} setLoading={setLoad}/>
      </div>
        )} 
        
          
      </div>
      
    </div>
     );
};



