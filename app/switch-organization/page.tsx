"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function SwitchOrganizationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || "/";

  // Listen for org switch and redirect
  useEffect(() => {
    const handler = () => {
      router.push(redirectTo);
    };

    window.addEventListener("organization:switched", handler);
    return () => {
      window.removeEventListener("organization:switched", handler);
    };
  }, [redirectTo, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 rounded-xl border shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-3">Switch Organization</h2>
        <p className="mb-4 text-muted-foreground">
          This document belongs to an organization. Please switch to the correct organization to continue.
        </p>
        <OrganizationSwitcher 
        afterSelectOrganizationUrl={redirectTo}    
        />
      </div>
    </div>
  );
}
