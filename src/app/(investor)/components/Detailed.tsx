import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import Discussion from "./Details/Discussion";
import { Investor } from "@/lib/data/mocked";
import axios from "axios"; // Import Axios

interface Props {
	selectedItem: Investor;
}

const Detailed: React.FC<Props> = ({ selectedItem }) => {
	const [selectedTab, setSelectedTab] = useState("Data Exchange");

	// Function to send data to the endpoint using Axios
	const sendDataToEndpoint = async (tabValue: string) => {
		try {
			const response = await axios.post("YOUR_API_ENDPOINT", {
				tab: tabValue,
				selectedItem,
			});
			console.log("Data sent successfully:", response.data);
		} catch (error) {
			console.error("Error sending data:", error);
		}
	};

	// useEffect(() => {
	// 	sendDataToEndpoint(selectedTab);
	// }, [selectedTab]); // Effect runs when selectedTab changes
	// alert(selectedTab);
	return (
		<TabsContent value='detail' className='w-full overflow-x-auto'>
			<div className='mt-4'>
				<p>Transaction Status</p>
				<Tabs
					defaultValue='Data Exchange'
					onValueChange={setSelectedTab} // Update the selected tab state
					className='w-full text-sm overflow-x-auto'
				>
					<TabsList className='flex md:grid w-full text-sm justify-start grid-cols-5 border bg-inherit mt-2 overflow-x-auto lg:overflow-hidden'>
						<TabsTrigger
							className='text-[10px] lg:text-sm data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none'
							value='Data Exchange'
						>
							Data Exchange
						</TabsTrigger>
						<TabsTrigger
							className='text-[10px] lg:text-sm data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none'
							value='Initial Offer'
						>
							Initial Offer
						</TabsTrigger>
						<TabsTrigger
							className='text-[10px] lg:text-sm data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none'
							value='Letter of Intent'
						>
							Letter of Intent
						</TabsTrigger>
						<TabsTrigger
							className='text-[10px] lg:text-sm data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none'
							value='Due Diligence'
						>
							Due Diligence
						</TabsTrigger>
						<TabsTrigger
							className='text-[10px] lg:text-sm data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] data-[state=active]:shadow-none rounded-none'
							value='Closing'
						>
							Closing
						</TabsTrigger>
					</TabsList>
					<Discussion selectedItem={selectedItem} />
				</Tabs>
			</div>
		</TabsContent>
	);
};

export default Detailed;
