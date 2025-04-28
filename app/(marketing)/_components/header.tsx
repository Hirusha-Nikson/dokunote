"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
    return ( 
        <header className="w-full flex justify-center items-center border-b h-16 top-0 fixed z-50 px-16">
            <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl">Header</h1>
            <div>
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
            </div>
        </header>
     );
}
 
export default Header;
