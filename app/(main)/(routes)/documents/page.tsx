"use client";

import { Suspense } from "react";
import NavigationBar from "./_components/navigationbar";
import HomeScreen from "./home-screen";
import LoadingSpinner from "@/components/loading-spinner"; // Use your existing one

const DocumentsPage = () => {
  return (
    <main className="w-full min-h-screen">
      <Suspense fallback={<LoadingSpinner label="Loading documents..." />}>
      <NavigationBar />
        <HomeScreen />
      </Suspense>
    </main>
  );
};

export default DocumentsPage;
