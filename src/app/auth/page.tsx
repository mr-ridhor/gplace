"use client";
import React from "react";
import { useSearchParams } from "next/navigation"; // For query parameters

const AuthPage: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "";

  return (
    <div>
      {step === "otp" && <div>OTP Page Content</div>}
      {step === "plan" && <div>Plan Page Content</div>}
      {/* Default or other content */}
    </div>
  );
};

export default AuthPage;
