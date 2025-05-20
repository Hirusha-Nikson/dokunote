"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { CloudUpload, FileUp, Loader } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation } from "convex/react";

import { useUser } from "@clerk/nextjs";

import uuid4 from "uuid4";
import axios from "axios";
import { useDropzone } from "react-dropzone";

export const PdfFileUploadPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadPDFOpen = () => {
    setIsOpen(true);
  };

  const handleUploadPDFClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col mt-4 w-full mx-auto">
      <div className="flex w-full items-center justify-between border border-muted rounded-2xl">
        <div className="flex flex-col w-full p-4">
          <h1>Upload a PDF</h1>
          <p className="text-sm text-muted-foreground">
            Upload a PDF file and summarize it with AI, Then create a note for
            your document here for further uses.
          </p>
        </div>
        <div className="flex items-center justify-end w-full p-4">
          <Button
            onClick={handleUploadPDFOpen}
            className="flex items-center justify-center"
          >
            Upload
          </Button>
        </div>
      </div>
      {isOpen && <UploadPDF onClose={handleUploadPDFClose} />}
    </div>
  );
};

export const UploadPDF = ({ onClose }: { onClose: () => void }) => {
  const params = useParams();
  const document_Id = params?.documents_Id;

  const user = useUser();

  const generateUploadUrl = useMutation(api.pdfstore.generateUploadUrl);
  const addPdfEntry = useMutation(api.pdfstore.addPdfEntry);
  const getPdfFilesUrl = useMutation(api.pdfstore.getPdfFilesUrl);
  const embaddDocument = useAction(api.myActions.ingest);

  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [] },
    multiple: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDrop: (acceptedFiles: string | any[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const onUpload = async () => {
    setIsLoading(true);

    const toastID = toast.loading("Uploading file...");

    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type || "application/octet-stream" },
        body: file,
      });
      const { storageId } = await result.json();

      console.log("File uploaded successfully:", storageId);

      const fileId = uuid4();

      const fileUrl = await getPdfFilesUrl({ storageId: storageId });

      const response = await addPdfEntry({
        fileld: fileId,
        documentId: document_Id as Id<"document">,
        ownerId: user.user?.id as string,
        fileName: file?.name || "unknown.pdf",
        storageId: storageId,
        fileUrl: fileUrl ?? "",
      });

      console.log("PDF entry added successfully:", response);

      //API call to fetch PDF processing data
      const apiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);

      console.log("PDF processing data:", apiResponse.data.result);

      embaddDocument({
        splitText: apiResponse.data.result,
        fileId: document_Id as Id<"document">,
      });
      toast.success("File uploaded successfully", { id: toastID });
    } catch {
      toast.error("Error uploading file. Please try again.", { id: toastID });
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <div className="flex flex-col mt-4 w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold"></CardTitle>
          <CardDescription>you can upload a pdf file here</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Input
            type="file"
            className="w-full text-sky-500 cursor-pointer"
            accept="application/pdf"
            onChange={(event) => onFileSelect(event)}
          /> */}
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed border-foreground/50 p-6 rounded-xl text-center cursor-pointer transition bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex flex-col items-center justify-center w-full my-4">
                <FileUp className="size-12 text-muted-foreground mb-6 opacity-65" />
                <p className="text-sm text-muted-foreground">{file.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full my-4">
                <CloudUpload className="size-12 text-muted-foreground mb-6 opacity-65" />
                <p className="font-semibold my-2">Upload a PDF</p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop a PDF file here, or click to select
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            className=""
            onClick={onClose}
            onSelect={(e) => e.stopPropagation()}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center justify-center"
            onClick={onUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
