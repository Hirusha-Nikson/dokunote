"use client";
import { ReactNode } from "react";

import SubHeader from "../../_components/sub-header";


const PdfLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
        <SubHeader pageTitle="Ai PDF"/>
        {children}
        </>
     );
}
 
export default PdfLayout;