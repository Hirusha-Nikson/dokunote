"use client";

import { SignUp } from "@clerk/clerk-react";
import Image from "next/image";


export default function SignUpPage() {
  return (
    <div className="relative w-full flex items-center justify-center h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 dark:from-neutral-800 to-transparent flex items-center justify-center">
              <Image src={"https://images.unsplash.com/vector-1738162097337-c9f1340abd41?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={"bg"} className="w-full h-full opacity-40 dark:opacity-25 object-cover grayscale" width={1920} height={1080}/>
            </div>
      <SignUp
        signInUrl="/sign-in"
        afterSignUpUrl="/"
      />
    </div>
  );
}