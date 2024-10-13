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
import { invcomType } from "@/lib/zod-type/invtcomType";
import { invproType } from "@/lib/zod-type/invproType";
import { invpro2Type } from "@/lib/zod-type/invpro2Type";
import { targetType } from "@/lib/zod-type/targetType";
import { priceType } from "@/lib/zod-type/priceType";
import { contType } from "@/lib/zod-type/contType";
import { companyType } from "@/lib/zod-type/companyType";
import axiosService from "@/lib/services/axiosService";
import { addInvestor } from "@/lib/actions/investorAction";
// import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const AddInvestorForm: React.FC = () => {
	const [currentTab, setCurrentTab] = useState<string>("company");
	const [visitedTabs, setVisitedTabs] = useState<string[]>(["company"]); // 'company' as default visited
	// const axiosAuth = useAxiosAuth();
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
	const resetTab = () => {
		setCurrentTab("company"); // Reset to the default tab
		setVisitedTabs(["company"]); // Optionally reset visited tabs
	};
	return (
		<DialogContent className='h-[450px] md:h-fit  max-h-[550px] w-[400px] md:w-[600px] my3 overflow-auto no-scrollbar'>
			<div className='spacey-3'>
				<p className='font-bold text-lg'>Add Investor</p>

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
					<CompanyInfom
						// setCompanyInfo={setInvCom}
						// companyInfo={invCom}
						// onBack={handleBackTab}
						onNext={handleNextTab}
					/>
					{/* <CompanyInfom
            setCompanyInfo={setCompanyInfo}
            companyInfo={companyInfo}
            onNext={handleNextTab}
          /> */}
					<ProfileInfo
						// setPro={setProfile}
						// profile={profile}
						onBack={handleBackTab}
						onNext={handleNextTab}
					/>
					<ProfileInfo2
						// setPro2={setProfile2}
						// profile2={profile2}
						onBack={handleBackTab}
						onNext={handleNextTab}
					/>

					<Target
						// target={target}
						// setTarget={setTarget}
						onBack={handleBackTab}
						onNext={handleNextTab}
					/>

					<Price
						// price={price} setPri={setPrice}
						onBack={handleBackTab}
						onNext={handleNextTab}
					/>

					<Contact
						onBack={handleBackTab}
						onTabReset={resetTab}
						// submit={handleSubmit}
						// conct={contact}
						// setContact={setContact}
					/>
					{/* No "Next" button on the last tab */}
				</Tabs>
			</div>
		</DialogContent>
	);
};

export default AddInvestorForm;
