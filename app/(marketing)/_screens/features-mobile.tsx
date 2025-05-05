"use client";

import { Hash } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Authentication from "../_components/_features_cards/authentication";
import CitesFormatCard from "../_components/_features_cards/cites-formats";
import CollaborateCard from "../_components/_features_cards/collaborate-card";
import CommentsCard from "../_components/_features_cards/comments-card";
import NotificationCard from "../_components/_features_cards/notifications";

const FeaturesMobile = () => {
  return (
    <div className="w-full min-h-screen px-4 py-8 bg-background">
      <div className="flex flex-col items-start justify-start gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sky-500 text-sm font-medium">
            <Hash className="w-4 h-4" />
            <span>Features</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
          Where Research Meets Simplicity.
          </h1>
        </div>

        {/* Feature Cards (Essentials only) */}
        <div className="flex flex-col gap-4 w-full">
          <Authentication />
          <CollaborateCard />
          <CitesFormatCard />

          {/* Toggle Themes */}
          <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl border-2 shadow p-4 gap-4">
            <ModeToggle />
            <div>
              <h1 className="font-semibold">Themes</h1>
              <p className="text-muted-foreground text-xs">
                Toggle between light and dark mode
              </p>
            </div>
          </div>

          {/* Comments */}
          <CommentsCard />

          {/* Notifications */}
          <NotificationCard />
        </div>
      </div>
    </div>
  );
};

export default FeaturesMobile;
