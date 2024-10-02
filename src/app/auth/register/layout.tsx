"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Leftpane from "../components/Leftpane";
import Link from "next/link";

const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "personal-info"; // Default to 'personal-info' if no step is provided

  const getCurrentStepId = () => {
    switch (step) {
      case "otp":
        return 5;
      case "plan":
        return 6;
      case "company-info":
        return 2;
      case "team-info":
        return 3;
      case "set-credentials":
        return 4;
      default:
        return 1; // Default step for 'personal-info'
    }
  };

  const currentStepId = getCurrentStepId();

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="md:w-[220px]">
        <Leftpane currentForm={currentStepId} />
      </div>

      <div className="flex-1 overflow-hidden">
        {currentStepId !== 6 && (
          <div className="sticky top-0 w-full flex-1 flex justify-end px-5 items-center h-14 z-10 text-[10px] md:text-sm lg:text-base ">
            <Link href={"login"}>Already a member? Sign in</Link>
          </div>
        )}
        {children}
        {currentStepId !== 6 && (
          <div className="sticky bottom-0 w-full flex-1 flex justify-center px-5 items-center h-14 z-10 text-[10px] md:text-sm lg:text-base ">
            <p>Your data is protected and encrypted</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterLayout;
