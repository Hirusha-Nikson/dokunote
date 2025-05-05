"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import Dokunote from "@/components/assets/Asset 2.png";
import { Button } from "@/components/ui/button";

const Header = () => {

  const user = useUser();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // You can tweak the scroll value
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 h-16 flex justify-center items-center px-4 md:px-16 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl border-b bg-background/50"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center backdrop-blur-none">
        <div className="flex items-center gap-2">
          <Image src={Dokunote} alt="logo" width={32} height={32} className="size-8 md:w-full invert dark:invert-0"/>
        <h1 className="text-xl md:text-2xl font-bold">Dokunote</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user.isSignedIn ? (<UserButton afterSignOutUrl="/" />) : (
            <Button>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
