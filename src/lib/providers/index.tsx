"use client";

import React, { FC, PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { StoreProvider } from "./StoreProvider";

interface AppProvidersProps extends PropsWithChildren {
  session: Session;
}

const AppProviders: FC<AppProvidersProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <TooltipProvider>
          {children}
          <Toaster />
          <SonnerToaster />
        </TooltipProvider>
      </StoreProvider>
    </SessionProvider>
  );
};

export default AppProviders;
