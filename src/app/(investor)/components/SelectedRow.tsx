"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Leftbar from "./Leftbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Detailed from "./Detailed";
import Contact from "./Contact";
import Email from "./Email";
import Notes from "./Notes";
import { useSession } from "next-auth/react";
import axios from "axios"; // Using axios instead of fetch
import { Investor } from "@/lib/data/mocked";
import LoaderComponent from "@/components/LoaderComponent";

const SelectedRow = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Investor | null>(null); // State for the investor
  const [activeTab, setActiveTab] = useState<string>("detail");
  console.log("path", pathname);
  const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL
  const { data: session } = useSession(); // Get the session data (assuming you're using next-auth)

  useEffect(() => {
    const fetchData = async () => {
      if (detail) {
        try {
          const response = await axios.get(`/api/investors/${detail}`); // Fetch investor data using Axios
          if (response.data) {
            setSelectedItem(response.data); // Set the fetched data
          }
        } catch (error) {
          console.error("Failed to fetch investor:", error);
        }
      }
    };

    fetchData();
    const currentTab = searchParams.get("tab") || "detail";
    setActiveTab(currentTab);
  }, [detail, searchParams]);

  // Ensure selectedItem is loaded before rendering
  if (!selectedItem) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );
  }

  // Handle tab change and update URL
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard?detail=${detail}&tab=${tab}`);
  };

  return (
    <div className="flex gap-x-6 h-fll w-full px- h-screen overflow-hidden">
      <Leftbar list={selectedItem} /> {/* Pass selectedItem to Leftbar */}
      <div className={`md:ml-[200px] w-full l p-4 h-full`}>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="h-full w-full"
        >
          <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-10 border-b">
            <div className="flex w-full">
              <div>
                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
                >
                  Detail
                </TabsTrigger>
              </div>
              <div>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
                >
                  Contact
                </TabsTrigger>
              </div>
              <div>
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
                >
                  Email exchange
                </TabsTrigger>
              </div>
              <div>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
                >
                  Notes
                </TabsTrigger>
              </div>
            </div>
          </TabsList>
          <Detailed selectedItem={selectedItem} />
          <Contact selectedItem={selectedItem} />
          <Email selectedItem={selectedItem} />
          <Notes selectedItem={selectedItem} />
        </Tabs>
      </div>
    </div>
  );
};

export default SelectedRow;
