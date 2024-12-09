// "use client";

// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import Leftbar from "./Leftbar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Detailed from "./Detailed";
// import Contact from "./Contact";
// import Email from "./Email";
// import Notes from "./Notes";
// import { useSession } from "next-auth/react";
// import axios from "axios";
// import { Investor } from "@/lib/data/mocked";
// import LoaderComponent from "@/components/LoaderComponent";

// const SelectedRow = () => {
// 	const searchParams = useSearchParams();
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const [selectedItem, setSelectedItem] = useState<Investor | null>(null);
// 	const [activeTab, setActiveTab] = useState<string>("detail");

// 	const detail = searchParams.get("detail");
// 	const { data: session } = useSession();

// 	const fetchData = async () => {
// 		if (detail) {
// 			try {
// 				const response = await axios.get(`/api/investors/${detail}`);
// 				if (response.data) {
// 					setSelectedItem(response.data);
// 				}
// 			} catch (error) {
// 				console.error("Failed to fetch investor:", error);
// 			}
// 		}
// 	};
// 	useEffect(() => {
// 		fetchData();
// 		const currentTab = searchParams.get("tab") || "detail";
// 		setActiveTab(currentTab);
// 	}, [detail, searchParams]);

// 	if (!selectedItem) {
// 		return (
// 			<div className='w-full h-72 flex items-center justify-center'>
// 				<LoaderComponent className='w-8 h-8 text-[#03AAC1]' />
// 			</div>
// 		);
// 	}

// 	const handleTabChange = (tab: string) => {
// 		setActiveTab(tab);
// 		router.push(`/dashboard?detail=${detail}&tab=${tab}`);
// 	};
// 	const refreshData = () => {
// 		if (detail) {
// 			fetchData();
// 		}
// 	};
// 	return (
// 		<div className='flex gap-x-6 h-full w-full px-'>
// 			<Leftbar list={selectedItem} />
// 			<div className={`md:ml-[200px] w-full l p-4 `}>
// 				<Tabs
// 					value={activeTab}
// 					onValueChange={handleTabChange}
// 					className=' w-full'
// 				>
// 					<TabsList className='w-full bg-inherit rounded-none rounded-t-md h-10 border-b'>
// 						<div className='flex w-full'>
// 							<div>
// 								<TabsTrigger
// 									value='detail'
// 									className='data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none'
// 								>
// 									Detail
// 								</TabsTrigger>
// 							</div>
// 							<div>
// 								<TabsTrigger
// 									value='contact'
// 									className='data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none'
// 								>
// 									Contact
// 								</TabsTrigger>
// 							</div>
// 							<div>
// 								<TabsTrigger
// 									value='email'
// 									className='data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none'
// 								>
// 									Email exchange
// 								</TabsTrigger>
// 							</div>
// 							<div>
// 								<TabsTrigger
// 									value='notes'
// 									className='data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none'
// 								>
// 									Notes
// 								</TabsTrigger>
// 							</div>
// 						</div>
// 					</TabsList>
// 					<Detailed selectedItem={selectedItem} />
// 					{/* <Contact selectedItem={selectedItem} /> */}
// 					<Contact selectedItem={selectedItem} onUpdate={refreshData} />
// 					<Email selectedItem={selectedItem} />
// 					<Notes selectedItem={selectedItem} />
// 				</Tabs>
// 			</div>
// 		</div>
// 	);
// };

// export default SelectedRow;
// SelectedRow.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Leftbar from "./Leftbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Detailed from "./Detailed";
import Contact from "./Contact";
import Email from "./Email";
import Notes from "./Notes";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Investor } from "@/lib/data/mocked";
import LoaderComponent from "@/components/LoaderComponent";

const SelectedRow = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<Investor | null>(null);
  const [activeTab, setActiveTab] = useState<string>("detail");

  // Get dynamic ID from the URL (from [detail])
  const detail = pathname.split("/").pop();
  const { data: session } = useSession();

  const fetchData = async () => {
    if (detail) {
      try {
        const response = await axios.get(`/api/investors/${detail}`);
        if (response.data) {
          setSelectedItem(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch investor:", error);
      }
    }
  };

  useEffect(() => {
    if (detail && !selectedItem) {
      fetchData(); // Fetch only when 'detail' is available and selectedItem is null
    }

    const currentTab = searchParams.get("tab") || "detail";
    setActiveTab(currentTab);
  }, [detail, searchParams, selectedItem]); // Only run when 'detail' or 'selectedItem' changes

  if (!selectedItem) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard/${detail}?tab=${tab}`);
  };
  const refreshData = () => {
			if (detail) {
				fetchData();
			}
		};
  return (
    <div className="flex gap-x-6 h-full w-full px-4">
      <Leftbar list={selectedItem} />
      <div className="md:ml-[200px] w-full l p-4">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-10 border-b">
            <div className="flex w-full">
              <TabsTrigger
                value="detail"
                className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
              >
                Detail
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
              >
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
              >
                Email exchange
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:border-b-2 data-[state=active]:bg-inherit data-[state=active]:border-[#04ABC2] rounded-none"
              >
                Notes
              </TabsTrigger>
            </div>
          </TabsList>
     
            <Detailed selectedItem={selectedItem} />
      
   
            {/* <Contact selectedItem={selectedItem} /> */}
			<Contact selectedItem={selectedItem} onUpdate={refreshData} />

     
    
            <Email selectedItem={selectedItem} />
       
            <Notes selectedItem={selectedItem} />
    
        </Tabs>
      </div>
    </div>
  );
};

export default SelectedRow;
