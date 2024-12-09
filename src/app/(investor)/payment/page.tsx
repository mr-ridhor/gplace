"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import PaymentHeader from "./components/PaymentHeader";
import Table from "./components/Table";

const page = () => {
  const navigate = useRouter();
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[80%] space-y-6  flex flex-col ">
          <div className="mt-4 ">
            <button
              className="flex items-center gap-3"
              onClick={() => navigate.back()}
            >
              <ChevronLeft />
              <p>Back</p>
            </button>
            <PaymentHeader />
          </div>
        <div className="my-4 flex w-full justify-center ">
        </div>
        <div className="">
          <Table investors={[]} />
        </div>
      </div>
    </div>
  );
};

export default page;
