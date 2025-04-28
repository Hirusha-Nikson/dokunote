"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn
        signUpUrl="/sign-up"
        afterSignInUrl="/documents"
      />
    </div>
  );
}
