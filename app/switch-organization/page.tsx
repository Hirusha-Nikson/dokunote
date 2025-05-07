import { Suspense } from "react";
import SwitchOrganizationClient from "./_components/client";

export default function SwitchOrganizationPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <SwitchOrganizationClient />
    </Suspense>
  );
}
