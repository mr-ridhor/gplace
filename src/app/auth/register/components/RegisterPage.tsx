"use client";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="h-full w-full bg-white overflow-">
      <div className="sticky top-0 w-full flex-1 flex justify-end px-5 items-center h-14  z-10">
        <Link href={"login"}>Already a member? Sign in</Link>
      </div>
      <div className="no-scrollbar  h-full overflow-y-auto">lorem</div>
    </div>
  );
};

export default RegisterPage;
