// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import CompanyInfo from "./components/CompanyInfo";
// import TeamInfo from "./components/TeamInfo";
// import Plan from "./components/Plan";
// import PersonalInfo from "./components/PersonalInfo";
// import Otp from "./components/Otp";
// import Credentials from "./components/Credentials";

// export default function RegisterPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [step, setStep] = useState("personal-info");

//   useEffect(() => {
//     const queryStep = searchParams.get("step");
//     setStep(queryStep || "personal-info");
//   }, [searchParams]);

//   const renderStep = () => {
//     switch (step) {
//       case "company-info":
//         return <CompanyInfo />;
//       case "team-info":
//         return <TeamInfo />;
//       case "set-credentials":
//         return <Credentials />;
//       case "otp":
//         return <Otp />;
//       case "plan":
//         return <Plan />;
//       case "personal-info":
//       default:
//         return <PersonalInfo />;
//     }
//   };

//   return (
//     <div className="h-full w-full flex flex-col justify-between overflow-hidden">
//       {renderStep()}
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyInfo from "./components/CompanyInfo";
import TeamInfo from "./components/TeamInfo";
import Plan from "./components/Plan";
import PersonalInfo from "./components/PersonalInfo";
import Otp from "./components/Otp";
import Credentials from "./components/Credentials";
import { personalType } from "@/lib/zod-type/personalType";
import { companyType } from "@/lib/zod-type/companyType";
import { teamType } from "@/lib/zod-type/teamType";
import { authType } from "@/lib/zod-type/authType";
import axiosService from "@/lib/services/axiosService";
// import { BioType } from "./types/bioType";
// import { CompanyType } from "./types/companyType";
// import { TeamType } from "./types/teamType";
// import { CredentialsType } from "./types/credentialsType";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState("personal-info");

  // State for each form step
  const [personalInfo, setPersonalInfo] = useState<personalType>({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    linkedIn: "",
    x: "",
    country: "",
    city: "",
    address: "",
    phone: "",
  });

  const [companyInfo, setCompanyInfo] = useState<companyType>({
    name: "",
    country: "",
    city: "",
    email: "",
    website: "",
    industry: "",
    foundingYear: "",
    revenue: {
      ltm: "",
      previousYear: "",
    },
    grossProfit: {
      ltm: "",
      previousYear: "",
    },
    EBITDA: {
      ltm: "",
      previousYear: "",
    },
  });

  const [teamInfo, setTeamInfo] = useState<teamType>({
    team1: {
      fullName: "",
      role: "",
    },
    team2: {
      fullName: "",
      role: "",
    },
  });

  const [credentials, setCredentials] = useState<authType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const queryStep = searchParams.get("step");
    setStep(queryStep || "personal-info");
  }, [searchParams]);

  const handleSubmit = async () => {
    // Combine all the data into one object
    const payload = {
      bio: personalInfo,
      company: companyInfo,
      team: teamInfo,
      credentials: credentials,
    };

    try {
      const response = await axiosService.post("/auth/signup", payload);

      if (response.status !== 200) {
        throw new Error("Failed to submit the data");
      }

      router.push("/login");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "company-info":
        return (
          <CompanyInfo
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            onNext={() => setStep("team-info")}
          />
        );
      case "team-info":
        return (
          <TeamInfo
            teamInfo={teamInfo}
            setTeamInfo={setTeamInfo}
            onNext={() => setStep("set-credentials")}
          />
        );
      case "set-credentials":
        return (
          <Credentials
            credentials={credentials}
            setCredentials={setCredentials}
            submit={handleSubmit}
          />
        );
      case "otp":
        return <Otp />;
      case "plan":
        return <Plan />;
      case "personal-info":
      default:
        return (
          <PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            onNext={() => setStep("company-info")}
          />
        );
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-hidden">
      {renderStep()}
    </div>
  );
}
