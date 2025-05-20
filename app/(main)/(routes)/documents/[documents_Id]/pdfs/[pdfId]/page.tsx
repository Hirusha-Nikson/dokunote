"use client";

import { useParams } from "next/navigation";
import { PdfPreview } from "./pdf-preview";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { ChatPromptPage } from "./chat-prompt";


const PdfIdPage = () => {

    const params = useParams();
    const pdfId = params.pdfId as string;

    const getPdf = useQuery(api.pdfstore.getPdfFiles, {
        documentId: params.documents_Id as Id<"document">,
        fileId: pdfId
    })

    useEffect(() => {
        console.log(getPdf)
    },[getPdf])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full overflow-hidden mt-[64px] gap-3">
        <ChatPromptPage/>
        <PdfPreview fileUrl={getPdf?.fileUrl || ""}/>
        </div>
     );
}
 
export default PdfIdPage;