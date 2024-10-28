import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Discussion from "./Details/Discussion";
import { Investor } from "@/lib/data/mocked";
import axios from "axios";
import { toast } from "sonner";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
	fetchInvestorsFailure,
	fetchInvestorsRequest,
	fetchInvestorsSuccess,
} from "@/lib/slice/investorSlice";

interface Props {
	selectedItem: Investor;
}

const Detailed: React.FC<Props> = ({ selectedItem }) => {
	const dispatch = useDispatch();
	const [selectedTab, setSelectedTab] = useState(
		selectedItem.status || "Data Exchange"
	);

	// Function to load investor data
	const loadInvestors = async () => {
		dispatch(fetchInvestorsRequest());
		try {
			const { data } = await axios.get("/api/investors");
			console.log("Fetched investors:", data);
			dispatch(fetchInvestorsSuccess(data));
		} catch (error: any) {
			console.error("Error fetching investors:", error);
			dispatch(
				fetchInvestorsFailure(
					error.response?.data?.message || "Failed to fetch"
				)
			);
		}
	};

	// Function to send data only when selectedTab changes
	const sendDataToEndpoint = async (tabValue: string) => {
		try {
			const response = await axios.put(`/api/investors/${selectedItem._id}`, {
				status: tabValue,
			});
			toast("Status updated successfully", {
				description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
			});
			console.log("Data sent successfully:", response.data);
			// Update investors list after status change
			loadInvestors();
		} catch (error) {
			console.error("Error sending data:", error);
		}
	};

	// Handle tab change and call the endpoint
	const handleTabChange = (tabValue: string) => {
		setSelectedTab(tabValue);
		sendDataToEndpoint(tabValue); // Only call when tab is switched
	};

	return (
		<TabsContent value='detail' className='w-full overflow-x-auto'>
			<div className='mt-4'>
				<p>Transaction Status</p>
				<Tabs
					defaultValue={selectedTab}
					onValueChange={handleTabChange} // Call handler on tab change
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
