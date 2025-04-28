"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-200 rounded-full p-4">
            <AlertTriangleIcon className="size-12 text-red-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-sm ">{error.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button onClick={() => reset()} className="font-medium px-6">
          Try again
        </Button>

        <Button
          variant="ghost"
          className="font-medium "
          onClick={() => window.location.replace("/documents")}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
