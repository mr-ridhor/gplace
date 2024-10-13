import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CompanyInfom from "./AddNewInvestor/CompanyInfom";
import ProfileInfo from "./AddNewInvestor/ProfileInfo";
import ProfileInfo2 from "./AddNewInvestor/ProfileInfo2";
import Target from "./AddNewInvestor/Target";
import Price from "./AddNewInvestor/Price";
import Contact from "./AddNewInvestor/Contact";

interface Props {
	onClose: () => void;
}

const AddInvestorForm = ({ onClose }: Props) => {
	const [currentTab, setCurrentTab] = useState<string>("company");
	const [visitedTabs, setVisitedTabs] = useState<string[]>(["company"]); // 'company' as default visited

	// List of all tabs
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

	// Handle moving to the previous tab
	const handleBackTab = () => {
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex > 0) {
			const prevTab = tabs[currentIndex - 1];
			handleTabChange(prevTab);
		}
	};

	// Reset the tabs and close
	const resetTab = () => {
		setCurrentTab("company"); // Reset to the default tab
		setVisitedTabs(["company"]); // Only 'company' is visited
		onClose();
	};

	return (
		<DialogContent className='h-[450px] md:h-fit max-h-[550px] w-[400px] md:w-[600px] my-3 overflow-auto no-scrollbar'>
			<div className='spacey-3'>
				<p className='font-bold text-lg'>Add Investor</p>

				{/* Display tab-specific information */}
				{currentTab === "company" && <p>Company Information</p>}
				{currentTab === "profile" && <p>Investment Profile information</p>}
				{currentTab === "profile2" && (
					<p>Investment Profile information (Continued)</p>
				)}
				{currentTab === "target" && (
					<p>Typical acquisition target information</p>
				)}
				{currentTab === "price" && <p>Typical price paid information</p>}
				{currentTab === "contact" && <p>Primary contact information</p>}

				<Tabs
					value={currentTab}
					onValueChange={handleTabChange}
					className='w-full text-sm'
				>
					<TabsList className='grid grid-cols-6 w-full gap-x-2 justify-start bg-inherit mt-2 overflow-x-auto'>
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
							>
								{/* {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "} */}
								{/* Capitalize first letter */}
							</div>
						))}
					</TabsList>

					<CompanyInfom onNext={handleNextTab} />
					<ProfileInfo onBack={handleBackTab} onNext={handleNextTab} />
					<ProfileInfo2 onBack={handleBackTab} onNext={handleNextTab} />
					<Target onBack={handleBackTab} onNext={handleNextTab} />
					<Price onBack={handleBackTab} onNext={handleNextTab} />
					<Contact onBack={handleBackTab} onTabReset={resetTab} />
				</Tabs>
			</div>
		</DialogContent>
	);
};

export default AddInvestorForm;
