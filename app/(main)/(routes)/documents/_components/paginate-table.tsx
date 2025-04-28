"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

import DocumentTableRow from "./paginate-row";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";

interface DocumentPaginateTableProps {
    documents: Doc<"document">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

const DocumentPaginateTable = ({
    documents,
    loadMore,
    status
}: DocumentPaginateTableProps) => {
  return (
    <div className="lg:w-2/3 w-full mx-auto flex flex-col">
        {documents === undefined? (
            <Loader className="flex justify-center items-center animate-spin"/>
        ): (
            
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-none opacity-65">
                        <TableCell>Name</TableCell>
                        <TableCell className="hidden sm:table-cell">&nbsp;</TableCell>
                        <TableCell>Shared</TableCell>
                        <TableCell className="hidden sm:table-cell">Created at</TableCell>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent border-none">
                            <TableCell colSpan={4} className="text-center opacity-60">No documents found . Make sure you are in either Organization or Personal account</TableCell>
                        </TableRow>
                    </TableBody>
                ): (
                    <TableBody>
                        {documents.map((document) => (
                            <DocumentTableRow key={document._id} document={document}/>
                        ))}
                    </TableBody>
                )}
            </Table> 
        )}
        <div className="flex justify-center items-center mt-4">
            <Button 
            variant="ghost"
            size="sm"
            onClick={() => loadMore(5)}
            disabled={status !== "CanLoadMore"}
            >
                {status === "CanLoadMore" ? "Load more" : "End of results" }
            </Button>
        </div>
    </div>
  )
}

export default DocumentPaginateTable