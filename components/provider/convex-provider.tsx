"use client";

import { ReactNode } from "react";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  ConvexReactClient,
  AuthLoading,
} from "convex/react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import LoadingSpinner from "../loading-spinner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,

      layout:{
        shimmer: false,
        unsafe_disableDevelopmentModeWarnings: true
      }
      }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
        <AuthLoading>
          <LoadingSpinner label="Auth Loading"/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
