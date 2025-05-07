"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

import SearchInput from "./search-input";
import { ModeToggle } from "@/components/mode-toggle";

const NavigationBar = () => {
  return (
    <div className="flex min-w-full h-[64px] py-2 px-4 border-b-0 border-[#E5E5E5] dark:border-[#222323] ">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-3">
          <p className="text-xl font-semibold">Dokunote</p>
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle/>
          <div className="w-8 overflow-hidden flex items-center scale-150 rounded-md">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/documents"
            afterLeaveOrganizationUrl="/documents"
            afterSelectOrganizationUrl="/documents"
            afterSelectPersonalUrl="/documents"
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
