"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FloatingDraggable } from "./draggable-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "./ui/badge";
import { Magnet } from "lucide-react";

export const DraggableToggleButton = () => {
  const params = useParams();
  const document_id = params.documents_Id as Id<"document">;

  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const hasInitialized = useRef(false);
  const previousData = useRef<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  const getMaterials = useQuery(api.useMaterials.getMaterialsByDocumentId, {
    documentId: document_id,
  });

  useEffect(() => {
    if (!getMaterials) return;

    if (!hasInitialized.current) {
      // First time loading data — just initialize, don't show badge
      previousData.current = getMaterials;
      hasInitialized.current = true;
      return;
    }

    const prevIds = previousData.current.map((mat) => mat._id);
    const newIds = getMaterials.map((mat) => mat._id);

    const isUpdated =
      newIds.some((id) => !prevIds.includes(id)) ||
      getMaterials.length !== previousData.current.length;

    if (isUpdated) {
      setShowBadge(true);
      previousData.current = getMaterials;
    }
  }, [getMaterials]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {open && isMounted && <FloatingDraggable />}

      <div className="relative inline-block">
        <Button
          variant="outline"
          size="icon"
          disabled={getMaterials?.length === 0}
          onClick={() => {
            setOpen(!open);
            setShowBadge(false); // reset badge when opened
          }}
        >
          <Magnet className="size-4" />
        </Button>

        {showBadge && !open && getMaterials?.length !== 0 && (
          <span className="absolute -top-2 -right-2">
            <Badge className="text-[8px] bg-red-500 text-white rounded-full px-1 py-0.5">
              New
            </Badge>
          </span>
        )}
      </div>
    </>
  );
};
