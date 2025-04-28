"use client";

import { PDFPaginatePage } from "./[pdfId]/_components/pdf-paginate";
import { PdfFileUploadPage } from "./pdf-page";


const PdfPage = () => {
    return ( 
        <>
        <div className="flex flex-col lg:w-2/3 w-5/6 overflow-hidden mt-[64px] mx-auto">
        <PdfFileUploadPage />
        <PDFPaginatePage/>
        </div>
        </>
     );
}
 
export default PdfPage;