"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockedsData, MockedData } from "@/lib/data/mocked"; // Import your mocked data
import Leftbar from "./Leftbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Detailed from "./Detailed";
import Contact from "./Contact";
import Email from "./Email";
import Notes from "./Notes";

const SelectedRow = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<MockedData | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState<string>("detail");

  const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL

  // Find the item that matches the 'detail' parameter
  useEffect(() => {
    const foundItem = mockedsData.find((item) => item.name === detail);
    setSelectedItem(foundItem);
  }, [detail]);

  // Sync the activeTab with the 'detail' value in URL
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  // Fallback object should match MockedData type
  const fallbackItem: MockedData = {
    name: "",
    country: "",
    website: "",
    investmentIndustry: "",
    investmentGeographies: "",
    dealsIn5Years: 0,
    dealSize: "",
    primaryContact: "",
    status: "",
    match: 0,
  };

  // Update the route and set the active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?detail=${detail}&tab=${tab}`);
  };

  return (
    <div className="flex gap-x-6 h-full w-full px-5">
      <Leftbar list={selectedItem || fallbackItem} />
      <div className="w-full mt-4">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="lg:w-[90%] w-full"
        >
          <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-10 border-b">
            <div className="flex w-full">
              <div className="">
                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-[#04ABC2] data-[state=active]:shadow-none rounded-none"
                >
                  Detail
                </TabsTrigger>
              </div>
              <div className="">
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-[#04ABC2] data-[state=active]:shadow-none rounded-none"
                >
                  Contact
                </TabsTrigger>
              </div>
              <div className="">
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-[#04ABC2] data-[state=active]:shadow-none rounded-none"
                >
                  Email exchange
                </TabsTrigger>
              </div>
              <div className="">
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-[#04ABC2] data-[state=active]:shadow-none rounded-none"
                >
                  Notes
                </TabsTrigger>
              </div>
            </div>
          </TabsList>

          <Detailed />

          <Contact />

          <Email />

          <Notes />
        </Tabs>
      </div>
    </div>
  );
};

export default SelectedRow;
