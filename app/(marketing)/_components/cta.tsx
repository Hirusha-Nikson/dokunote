"use client";

import { FadeUp } from "@/components/fade-up";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function CallToAction() {
  const projects = useQuery(api.documents.getDocumentsCount);

  const personalProjects = projects?.filter(
    (project) => project.organizationId === ""
  );

  const stats = useQuery(api.documents.getOrganizationStats);

  return (
    <section className="relative bg-foreground flex flex-col items-center justify-center px-6 overflow-hidden h-full py-8">
      {/* CTA Content */}
      <FadeUp duration={0.5} delay={0.2}>
      <div className="max-w-4xl mx-auto text-center text-background relative z-10">
        
        <h2 className="text-4xl font-bold mb-4">
          Join Thousands Simplifying Research with Dokunote
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 my-6">
          <div className="flex flex-col items-center justify-center md:border-r md:border-muted-foreground">
            <p className="text-3xl font-bold">{stats?.uniqueOrgs ?? "..."}</p>
            <p className="text-sm ">Teams</p>
          </div>
          <div className="flex flex-col items-center justify-center md:border-r md:border-muted-foreground">
            <p className="text-3xl font-bold">{stats?.totalOrgProjects ?? "..."}</p> 
            <p className="text-sm ">Collaborative Projects</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">{personalProjects?.length}</p>
            <p className="text-sm ">Individual Projects</p>
          </div>
        </div>
        <p className="text-md mb-8">
        Sign up today and experience a smarter, faster way to take notes, organize sources, and generate citations — all in one collaborative workspace.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant={null}
            className="bg-background text-foreground hover:bg-background/90"
          >
            Get Started for Free
          </Button>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
