"use client";
import { NotesPage } from "./notes";
import SubHeader from "../../_components/sub-header";

const Notes = () => {

    return ( 
        <>
        <SubHeader pageTitle="Notes"/>
        <div className="flex flex-col lg:w-2/3 w-5/6 overflow-hidden mt-[64px] mx-auto">
        <NotesPage />
        </div>
        </>
     );
}
 
export default Notes;