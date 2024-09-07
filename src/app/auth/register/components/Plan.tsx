import { Button } from "@/components/ui/button";
import React from "react";
// import axios from "axios";

const Plan = () => {
  const handlePlanSelection = async (planType: string) => {
    try {
      // Send the selected plan type to the backend
      // await axios.post("/api/plan-selection", { planType });
      // Optionally handle successful response (e.g., show a confirmation message)
      // alert(`Selected plan: ${planType}`);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending plan selection:", error);
    }
  };

  return (
    <div className="h-full space-y-4 overflow-y-auto no-scrollbar justify-center flex flex-col items-center w-full">
      <div className="h-[80%] w-[60%] mt-">
        <div className="w-full h-[78%]">
          <div className="w-full items-center justify-center flex flex-col">
            <p className="font-bold text-xl">Subscription plan</p>
            <p className="text-sm font-normal">
              Select your plan to be able to use GoodPlace CRM
            </p>
          </div>
          <div className="w-full h-full flex justify-center mt-5">
            <div className="w-[70%] h-full flex gap-x-4">
              <div className="border rounded-md h-full w-1/2 py-4 flex flex-col items-center justify-between">
                <div className="w-[80%]">
                  <div className="w-full mt-2 space-y-4">
                    <div className="bg-[#DCF8FC] h-6 rounded-md flex items-center justify-center">
                      <p className="text-sm">Free Plan</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-2xl">$0</p>
                      <p className="text-[#B3B3B3]">Unlimited</p>
                    </div>
                  </div>
                </div>
                <div className="w-[80%] text-[14px] h-[60%] space-y-3 flex flex-col justify-between">
                  <p className="text-[#03AAC1]">Perks</p>
                  <p>5 investors</p>
                  <p>Unlimited pipelines</p>
                  <p>Unlimited users</p>
                  <div className="h-[50%] w-full flex items-end">
                    <Button
                      className="w-full text-white h-8"
                      onClick={() => handlePlanSelection("free")}
                    >
                      <p>Choose</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border rounded-md h-full w-1/2 py-4 flex flex-col items-center justify-between">
                <div className="w-[80%]">
                  <div className="w-full mt-2 space-y-4">
                    <div className="bg-[#834CFF] h-6 rounded-md flex items-center justify-center">
                      <p className="text-sm text-white">Platinum</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-2xl">$150</p>
                      <p className="text-[#B3B3B3]">Billed annually</p>
                    </div>
                  </div>
                </div>
                <div className="w-[80%] text-[14px] h-[60%] space-y-3 flex flex-col justify-between">
                  <p className="text-[#03AAC1]">Perks</p>
                  <p>25 investors</p>
                  <p>Unlimited pipelines</p>
                  <p>Unlimited users</p>
                  <p>Matching with Investors</p>
                  <div className="h-[50%] w-full flex items-end">
                    <Button
                      className="w-full text-white h-8"
                      onClick={() => handlePlanSelection("platinum")}
                    >
                      <p>Choose</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
