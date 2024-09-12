"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyInfo from "./components/CompanyInfo";
import TeamInfo from "./components/TeamInfo";
import Plan from "./components/Plan";
import PersonalInfo from "./components/PersonalInfo";
import Otp from "./components/Otp";
import Credentials from "./components/Credentials";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState("personal-info");

  useEffect(() => {
    const queryStep = searchParams.get("step");
    setStep(queryStep || "personal-info");
  }, [searchParams]);

  const renderStep = () => {
    switch (step) {
      case "company-info":
        return <CompanyInfo onNext={() => setStep("team-info")} />;
      case "team-info":
        return <TeamInfo onNext={() => setStep("set-credentials")} />;
      case "set-credentials":
        return <Credentials onNext={() => setStep("otp")} />;
      case "otp":
        return <Otp onNext={() => setStep("plan")} />;
      case "plan":
        return <Plan />;
      case "personal-info":
      default:
        return <PersonalInfo onNext={() => setStep("company-info")} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-hidden">
      {renderStep()}
    </div>
  );
}
