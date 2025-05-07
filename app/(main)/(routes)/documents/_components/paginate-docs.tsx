"use client";

import { api } from "@/convex/_generated/api";
import { useConvexAuth, usePaginatedQuery } from "convex/react"
import DocumentPaginateTable from "./paginate-table";
import { useSearchParam } from "@/hooks/use-search-param";
import LoadingSpinner from "@/components/loading-spinner";
import { Loader } from "lucide-react";
import { Suspense } from "react";


const DocumentPaginate = () => {
  const { isLoading:isAuthLoading, isAuthenticated } = useConvexAuth();
  const [search] = useSearchParam();

  
  const {
    results,
    status,
    loadMore,
    isLoading: isQueryLoading,
  } = usePaginatedQuery(
    api.documents.getDocumentsPaginate,
    isAuthLoading || !isAuthenticated ? "skip" : { search },
    { initialNumItems: 5 }
  );

  if (isAuthLoading) {
    return <><LoadingSpinner label="Auth loading"/></>;
  }

  if (isQueryLoading && status === "LoadingFirstPage") {
    return (
      <div className="h-screen mx-auto text-center justify-center items-center">
        <Loader className="animate-spin w-6 h-6 opacity-70 my-2 mx-auto" />
        <span className="text-sm opacity-70">Documents loading</span>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<Loader className="animate-spin w-6 h-6 opacity-70 my-2 mx-auto" />}>
      <DocumentPaginateTable
        documents={results}
        status={status}
        loadMore={loadMore}
      />
      </Suspense>
    </div>
  );
};

export default DocumentPaginate