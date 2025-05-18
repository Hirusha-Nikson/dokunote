"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import Dokunote from "@/components/assets/Asset 2.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const Header = () => {
  const user = useUser();

  const router = useRouter();

  const isMobile = useIsMobile();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // You can tweak the scroll value
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    router.push("/sign-in");
  };

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
          <Image
            src={Dokunote}
            alt="logo"
            width={32}
            height={32}
            className="size-8 md:w-full invert dark:invert-0"
          />
          <h1 className="text-xl md:text-2xl font-bold">Dokunote</h1>
        </div>
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="relative opacity-90"
                size={"icon"}
              >
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem>
                {user.isSignedIn ? (
                  <div className="flex items-center justify-between w-full gap-8">
                  
                    <div className="flex flex-col overflow-hidden">
                      <p className="font-semibold">{user.user?.fullName}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  
                  <div>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>) : (
                  <Button onClick={handleLoginClick}>Login</Button>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <div className="w-full flex justify-between items-center gap-8">
                  <div className="flex flex-col overflow-hidden">
                    <p className="font-semibold">Appearance</p>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                  </div>
                  <div>
                    <ModeToggle variant="secondary"/>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/documents")}>
                <Button className="w-full" disabled={!user.isSignedIn}>WorkSpace</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            {user.isSignedIn && (
              <Button variant={"secondary"} onClick={() => router.push("/documents")}>
                WorkSpace
              </Button>
            )}
            <ModeToggle variant="secondary"/>
            {user.isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Button variant={"secondary"} onClick={handleLoginClick}>Login</Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
