"use client";
import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CompanyInfom from "./AddNewInvestor/CompanyInfom";
import ProfileInfo from "./AddNewInvestor/ProfileInfo";
import ProfileInfo2 from "./AddNewInvestor/ProfileInfo2";
import Target from "./AddNewInvestor/Target";
import Price from "./AddNewInvestor/Price";
import Contact from "./AddNewInvestor/Contact";

const AddInvestorForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("company");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["company"]); // 'company' as default visited

  const tabs = ["company", "profile", "profile2", "target", "price", "contact"];

  // Handle tab change and mark as visited
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (!visitedTabs.includes(value)) {
      setVisitedTabs([...visitedTabs, value]);
    }
  };

  // Handle moving to the next tab
  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1];
      handleTabChange(nextTab);
    }
  };

  return (
    <DialogContent className="max-h-[550px]  w-[600px] my-3 overflow-auto no-scrollbar">
      <div className="space-y-3">
        <p className="font-bold text-lg">Add Investor</p>

        {/* Tabs with disabled trigger buttons */}
        {currentTab === "company" && <p>Company Information</p>}
        {currentTab === "profile" && <p>Investment Profile information</p>}
        {currentTab === "profile2" && (
          <p>Investment Profile information (Continued)</p>
        )}
        {currentTab === "target" && (
          <p>Typical acquisation target information</p>
        )}
        {currentTab === "price" && <p>Typical price paid information</p>}
        {currentTab === "contact" && <p>Primary contact information</p>}
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full text-sm"
        >
          <TabsList className="grid grid-cols-6 w-full gap-x-2 justify-start bg-inherit mt-2 overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`text-[10px] lg:text-sm rounded-md px-3 py-1
                  ${
                    visitedTabs.includes(tab)
                      ? "bg-[#04acc2] text-white" // Same color for current and visited
                      : "bg-[#DCF8FC] text-black" // Default for unvisited
                  }
                `}
              ></div>
            ))}
          </TabsList>
          <CompanyInfom onNext={handleNextTab} />

          <ProfileInfo onNext={handleNextTab} />
          <ProfileInfo2 handleClick={handleNextTab} />

          <Target handleClick={handleNextTab} />

          <Price handleClick={handleNextTab} />

          <Contact />
        </Tabs>
      </div>
    </DialogContent>
  );
};

export default AddInvestorForm;
