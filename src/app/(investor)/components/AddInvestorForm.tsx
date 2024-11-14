import React, { useEffect, useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CompanyInfom from "./AddNewInvestor/CompanyInfom";
import ProfileInfo from "./AddNewInvestor/ProfileInfo";
import ProfileInfo2 from "./AddNewInvestor/ProfileInfo2";
import Target from "./AddNewInvestor/Target";
import Price from "./AddNewInvestor/Price";
import Contact from "./AddNewInvestor/Contact";
import { GrClose } from "react-icons/gr";

interface Props {
	onClose: () => void;
	isOpen: boolean; // New prop to determine if the dialog is open
}

const AddInvestorForm = ({ onClose, isOpen }: Props) => {
	const [currentTab, setCurrentTab] = useState<string>("company");
	const [visitedTabs, setVisitedTabs] = useState<string[]>(["company"]); // 'company' as default visited
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
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
	useEffect(() => {
		if (isOpen) {
			setCurrentTab("company");
			setVisitedTabs(["company"]);
		}
	}, [isOpen]);
	const handleClose = () => {
		setShowConfirmation(true); // Show confirmation dialog
	};

	// Confirm exit
	const confirmExit = (confirm: boolean) => {
		if (confirm) {
			onClose(); // Close the form
		}
		setShowConfirmation(false); // Hide the confirmation dialog
	};
	return (
		<DialogContent
			onInteractOutside={(e) => {
				e.preventDefault();
			}}
			className='h-[450px] md:h-fit max-h-[550px] w-[400px] md:w-[600px] my-3 overflow-auto no-scrollbar'
		>
			<div
				onClick={handleClose}
				className='flex flex-col h-8 right-1 absolute m-2 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 w-8 p-3 '
			>
				<GrClose size={24} color='black' />
			</div>
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
								className={`text-[10px] lg:text-sm rounded-md px-3 py-1 ${
									visitedTabs.includes(tab)
										? "bg-[#04acc2] text-white"
										: "bg-[#DCF8FC] text-black"
								} `}
							></div>
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
			{showConfirmation && (
				<div className='absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10'>
					<div className='bg-white p-5 rounded-md shadow-md'>
						<p>Are you sure you want to exit?</p>
						<div className='w-full flex justify-center'>
							<div className='flex gap-4 mt-4 w-[80%]  justify-between'>
								<button
									onClick={() => confirmExit(true)}
									className='px-4 py-2 bg-[#04acc2] text-white  rounded-md'
								>
									Yes
								</button>
								<button
									onClick={() => confirmExit(false)}
									className='px-4 py-2 bg-[#CCC]  rounded-md'
								>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</DialogContent>
	);
};

export default AddInvestorForm;
