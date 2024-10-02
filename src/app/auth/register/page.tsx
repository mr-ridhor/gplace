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

  const handleNext = (nextStep: string) => {
    setStep(nextStep);
    router.push(`?step=${nextStep}`);
  };

  const handleBack = (prevStep: string) => {
    setStep(prevStep);
    router.push(`?step=${prevStep}`);
  };

  const renderStep = () => {
    switch (step) {
      case "company-info":
        return (
          <CompanyInfo
            onNext={() => handleNext("team-info")}
            onBack={() => handleBack("personal-info")}
          />
        );
      case "team-info":
        return (
          <TeamInfo
            onNext={() => handleNext("set-credentials")}
            onBack={() => handleBack("company-info")}
          />
        );
      case "set-credentials":
        return (
          <Credentials
            onNext={() => handleNext("otp")}
            onBack={() => handleBack("team-info")}
          />
        );
      case "otp":
        return (
          <Otp
            onNext={() => handleNext("plan")}
            // onBack={() => handleBack("set-credentials")}
          />
        );
      case "plan":
        return <Plan />;
      case "personal-info":
      default:
        return <PersonalInfo onNext={() => handleNext("company-info")} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-hidden">
      {renderStep()}
    </div>
  );
}
