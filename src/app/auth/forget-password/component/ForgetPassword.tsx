"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResetPassword from "./ResetPassword";
import Link from "next/link";
import Email from "./Email";
import Otp from "./Otp";
import { pinType } from "@/lib/zod-type/pinType";
import { resetType } from "@/lib/zod-type/resetType";
import { emailType } from "@/lib/zod-type/emailType";
import Logo from "@/app/svgComponent/Logo";
import { useEffect, useState } from "react";

const ForgetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState("email");

  useEffect(() => {
    const queryStep = searchParams.get("step");
    setStep(queryStep || "email"); // Default to "email" if no step is found
  }, [searchParams]);

  const handleNextStep = (nextStep: "email" | "otp" | "reset") => {
    router.push(`/auth/forget-password?step=${nextStep}`);
  };

  const handleEmailSubmit = (data: emailType) => {
    const { email } = data;
    console.log(email);
    handleNextStep("otp");
  };

  const handleOtpSubmit = (data: pinType) => {
    const otp = data.otpCode;
    console.log(otp);
    handleNextStep("reset");
  };

  const handlePasswordReset = (data: resetType) => {
    const { newPassword } = data;
    console.log(newPassword);
    alert("Password successfully reset!");
    router.push("/auth/login"); // Redirect to login or another page as needed
  };

  const renderContent = () => {
    switch (step) {
      case "otp":
        return <Otp onSubmit={handleOtpSubmit} />;
      case "reset":
        return <ResetPassword onSubmit={handlePasswordReset} />;
      case "email":
      default:
        return <Email onSubmit={handleEmailSubmit} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="sticky top-0 w-full flex-1 flex justify-end  px-5 items-center h-16 z-10">
        <Link href="/auth/register">Not a customer? Sign up</Link>
      </div>
      <div className="h-full overflow-hidden  w-full flex items-center justify-center">
        <div className=" w-[300px] lg:w-[500px] h-[550px] space-y-4">
          <div className="flex w-full justify-center my-4">
            <Logo />
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
