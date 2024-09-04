"use client";

import React, { FC, PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface AppProvidersProps extends PropsWithChildren {
  session: Session;
}

const AppProviders: FC<AppProvidersProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        {children}
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </SessionProvider>
  );
};

export default AppProviders;
