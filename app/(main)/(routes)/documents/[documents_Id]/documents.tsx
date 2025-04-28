"use client";

import { useParams, useRouter } from "next/navigation";
import EditorHeader from "../_components/editor-header";
import EditorCover from "./editor-cover";

import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { useEffect } from "react";
import { useOrganization } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const EditorPage = dynamic(() => import("./editor"), {
  ssr: false,
});

export const Document = () => {
  const params = useParams();
  const router = useRouter();
  const { organization } = useOrganization();

  const documnets = useQuery(api.documents.getDocumentById, {
    id: params.documents_Id as Id<"document">,
  });

  const headerTitle = documnets?.title || "Untitled Document";
  const createdAt = documnets?._creationTime
    ? format(new Date(documnets._creationTime), "dd/MM/yyyy")
    : "Unknown Date";

  const update = useMutation(api.documents.updateDocumentContentById);

  const onChange = (content: string) => {
    setTimeout(() => {
      update({
        id: params.documents_Id as Id<"document">,
        content,
      });
    }, 0);
  };

  // ✅ Redirect if in personal mode and document has org ID
  useEffect(() => {
    if (
      documnets?.organizationId &&
      (!organization || organization.id !== documnets.organizationId)
    ) {
      const redirectTo = `/documents/${params.documents_Id}`;
      router.replace(`/switch-organization?redirectTo=${encodeURIComponent(redirectTo)}`);
    }
  }, [documnets, organization, params.documents_Id, router]);

  <div className="w-full flex items-center justify-center">
  <Loader className="animate-spin size-5"/>
  </div>
  if (
    documnets?.organizationId &&
    (!organization || organization.id !== documnets.organizationId)
  ) {
    return (
      <div className="w-full flex items-center justify-center">
      <Loader className="animate-spin size-5" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <EditorHeader title={headerTitle} isOrganization={!!documnets?.organizationId}/>
      <EditorCover
        title={headerTitle}
        createdAt={createdAt}
        documentId={params.documents_Id as Id<"document">}
      />
      <EditorPage onChange={onChange} initialContent={documnets?.content} />
    </div>
  );
};
