"use client";

import { Plus } from "lucide-react";
import CreateDocument from "./_components/_functions/create-docs";
import DocumentPaginate from "./_components/paginate-docs";
import { Button } from "@/components/ui/button";

const HomeScreen = () => {
    return (
        <div className="grid grid-rows-3 h-full gap-10">
            <div className='flex flex-col items-center justify-end gap-4 mt-8'>
            <div>
                <h1 className='text-3xl font-bold text-center'>Welcome to Dokunote</h1>
            </div>
            <div>
              <p className='text-center mx-auto w-3/4 opacity-75 text-sm'>
                Welcome to Dokunote. create, share, and manage notes efficiently with Dokunote workspace.
              </p>
            </div>
            <div>
            <Button asChild variant="outline" className="flex items-center">
              <CreateDocument
                buttonText="Create Document"
                icon={Plus}
                className="ml-2"
              />
            </Button>
            </div>
          </div>
            <div className="row-span-2 mx-auto w-full px-3 mb-12 py-8 overflow-y-auto">
                <DocumentPaginate />
            </div>
        </div>
    );
}

export default HomeScreen;