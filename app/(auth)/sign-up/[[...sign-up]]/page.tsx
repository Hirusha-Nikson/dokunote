"use client";

import { SignUp } from "@clerk/clerk-react";


export default function SignUpPage() {
  return (
    <div>
      <SignUp
        signInUrl="/sign-in"
        afterSignUpUrl="/documents"
      />
    </div>
  );
}