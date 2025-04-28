"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

import "@liveblocks/react-tiptap/styles.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/attributes.css";

import nProgress from "nprogress";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, resolvedTheme } = useTheme();

  const pathname = usePathname();
  useEffect(() => {
    nProgress.start();
    
    setTimeout(() => {
      nProgress.done();
    }, 2000);
  }, [pathname]);

  nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    easing: "ease",
    speed: 500,
    minimum: 0.1,
  });
 
  return (
    <>
      <Toaster
        position="bottom-center"
        theme={
          theme === "system"
            ? (resolvedTheme as "light" | "dark")
            : (theme as "light" | "dark")
        }
        richColors
      />

      <div className="w-full min-h-screen overflow-hidden">{children}</div>
      </>
  );
};

export default MainLayout;
