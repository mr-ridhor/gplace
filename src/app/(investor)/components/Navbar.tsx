"use client";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	setActiveTab,
	resetSelectedRow,
	getSelectedRow,
	getActiveTab,
} from "@/lib/slice/selectedRowSlice";
import { Menu, X } from "lucide-react";
import Logo from "@/app/svgComponent/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Filter from "@/app/svgComponent/Filter";
import { FaPen, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddInvestorForm from "./AddInvestorForm";
import Image from "next/image";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {
	getPanel,
	toggleFilterPanel,
	toggleSearchPanel,
	closeAllPanels,
} from "@/lib/slice/panelSlice";
import { getInvestor, setCompanyInfo } from "@/lib/slice/addInvestorSlice";
import { useForm } from "react-hook-form";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Navbar = () => {
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
	const [showPanel, setShowPanel] = React.useState<Checked>(false);
	const { data: session } = useSession();
	const { showFilter, showSearch } = useSelector(getPanel);
	const dispatch = useDispatch();
	const [isDialogOpen, setIsDialogOpen] = React.useState(false); //
	const router = useRouter();
	const selectedRow = useSelector(getSelectedRow);
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");
	const selectedRowId = localStorage.getItem("selectedRowId");
	const [openSearch, setOpenSearch] = React.useState(false);
	const activeTab = useSelector(getActiveTab);
	const investors = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
	const [showAlert, setShowAlert] = React.useState(false);
	const modalRef = React.useRef(null);

	const handleOutsideClick = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setShowAlert(true); // Show alert before closing
		}
	};

	const handleCloseModal = () => {
		setShowAlert(false); // Hide alert
		// setIsOpen(false); // Close the modal
		// isDialogOpen
		setIsDialogOpen(false);
	};
	const [searchTerm, setSearchTerm] = React.useState(""); // Tr
	const { contact, companyInfo, profile, profile2, target, price } =
		useSelector(getInvestor);
	const searchContainerRef = React.useRef<HTMLDivElement>(null); // Reference for search container
	const [results, setResults] = React.useState<string[]>([]); //
	const shouldClosePanels = () => {
		return (
			pathname === "/dashboard" &&
			detail !== "" &&
			detail !== null &&
			tab === "detail"
		);
	};
	const shouldRender = () => {
		// Check if the path is "/dashboard"
		if (pathname === "/dashboard") {
			// If 'detail' query param is empty and 'tab' is 'detail'
			if (
				searchParams.get("detail") === "" &&
				searchParams.get("tab") === "detail"
			) {
				return true;
			}
			// If no query params, treat it as /dashboard
			if (!searchParams.get("detail") && !searchParams.get("tab")) {
				return true;
			}
		}
		return false;
	};
	const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL
	// console.log(tab);
	const pathname = usePathname();

	// console.log(pathname);
	React.useEffect(() => {
		if (pathname === "/profile") {
			dispatch(setActiveTab(""));
		}
	}, [pathname, dispatch]);
	React.useEffect(() => {
		if (shouldClosePanels()) {
			dispatch(closeAllPanels());
		}
	}, [pathname, detail, tab, dispatch]);
	const handleInvestorsClick = () => {
		router.push(`/dashboard?detail=&tab=detail`);
		dispatch(setActiveTab("investors"));
		// localStorage.removeItem("selectedRowId");
	};
	const handleOpenDialog = () => {
		setIsDialogOpen(true); // Open the dialog
		setOpenSearch(false); // Close the search dropdown
	};

	const handleSelectedRowClick = () => {
		if (selectedRow) {
			router.push(`/dashboard?detail=${selectedRowId}&tab=detail`);
			dispatch(setActiveTab(selectedRow));
		}
	};

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent event from bubbling up to parent triggers
		dispatch(resetSelectedRow());
		router.push(`/dashboard?detail=&tab=detail`); // Optionally reset to a default tab
		localStorage.removeItem("selectedRowId");
	};
	// Handle search input changes
	// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const value = e.target.value;
	// 	setSearchTerm(value);

	// 	// Filter investors based on input
	// 	if (value.trim() === "") {
	// 		setResults([]); // Clear results if input is empty
	// 	} else {
	// 		const filteredResults = investors.filter((investor) =>
	// 			investor.toLowerCase().includes(value.toLowerCase())
	// 		);
	// 		setResults(filteredResults);
	// 	}
	// };
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);

		// Filter investors based on input
		if (value.trim() === "") {
			setResults([]); // Clear results if input is empty
		} else {
			const filteredResults = investors.filter((investor) =>
				investor.toLowerCase().includes(value.toLowerCase())
			);
			setResults(filteredResults);
		}
	};
	// Close openSearch when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target as Node)
			) {
				setOpenSearch(false); // Close search if clicking outside
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const form = useForm();
	const handleClose = () => {
		dispatch(setCompanyInfo(form.getValues()));
		setIsDialogOpen(false);
	};
	return (
		<div className='w-full h-16 px-5 sticky top-0 z-10 flex items-center justify-between bg-[#F5F8FA]'>
			<div className='flex'>
				<Link
					href={"/dashboard?detail=&tab=detail"}
					onClick={handleInvestorsClick}
				>
					<div className='w-max'>
						<Logo width={180} height={60} />
					</div>
				</Link>

				<Tabs value={tab || "detail"} className='w-full p-2 md:flex hidden'>
					<TabsList className='w-full bg-inherit rounded-none rounded-t-md h-12 p-0'>
						<TabsTrigger
							value='investors'
							className={`w-full h-full rounded-none border-b rounded-t-md 
                  ${
										activeTab === "investors"
											? " data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none bg-white"
											: ""
									}`}
							onClick={handleInvestorsClick}
						>
							Investors
						</TabsTrigger>
						{selectedRow && (
							<TabsTrigger
								value={selectedRow}
								className={`w-full h-full rounded-none border-b rounded-t-md 
                 ${
										activeTab === selectedRow
											? " data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none bg-white"
											: ""
									}`}
								onClick={handleSelectedRowClick}
							>
								<div className='flex items-center capitalize'>
									{selectedRow}
									<X
										className='ml-2 cursor-pointer'
										onClick={handleCloseClick}
										size={16}
									/>
								</div>
							</TabsTrigger>
						)}
					</TabsList>
				</Tabs>
			</div>

			<div className='hidden md:flex items-center h-full gap-x-4 justify-end'>
				{pathname !== "/profile" &&
				((tab as string) !== "contact" || (tab as string) === "detail") ? (
					<>
						<div
							className='flex gap-x-2 items-center cursor-pointer'
							// onClick={() => dispatch(toggleFilterPanel())}
							onClick={() => {
								shouldRender() && dispatch(toggleFilterPanel());
							}}
						>
							<Filter />
							<p>Filter</p>
						</div>

						<div
							className='h-1/2 items-center flex gap-x border rounded-md w-2/4 px-2 cursor-pointer relative'
							ref={searchContainerRef}
						>
							<Search size={14} />
							<input
								placeholder='Search Investors'
								className='focus-visible:outline-none h-1/2 px-2 w-[90%] placeholder:text-sm bg-inherit'
								value={searchTerm}
								onChange={handleSearchChange} // Bind input changes to handleSearchChange
								onClick={() => setOpenSearch(true)} // Open the search on input click
							/>
							{searchTerm &&
								openSearch && ( // Show dropdown only if there's a search term and search is open
									<div className='w-[400px] top-10 right-1 max-h-[300px] shadow-xl bg-white rounded-md absolute z-40 p-2 '>
										{/* Search Results */}
										{results.length === 0 ? (
											<div className='flex flex-col items-center'>
												<p className='text-center text-gray-500'>
													No results found
												</p>
												{/* Button to open dialog when no investor is found */}
												<Button
													className='hover:bg-[#0691A5] text-white h-10 gap-x-2 mt-2 w-[60%]'
													onClick={handleOpenDialog}
												>
													<FaPlus />
													Add Investor
												</Button>
											</div>
										) : (
											<ul>
												{results.map((result, index) => (
													<li
														key={index}
														className='py-2 px-4 hover:bg-gray-200'
													>
														{result}
													</li>
												))}
											</ul>
										)}
									</div>
								)}
						</div>
					</>
				) : (
					<Link href={"profile"}>
						<Button className='bg-[#dcf8fc] hover:bg-[#B9E5EB] text-[#1E1E1E] flex items-center gap-x-1'>
							<FaPen />
							Edit
						</Button>
					</Link>
				)}

				{/* User Profile and Logout */}
				<div className='cursor-pointer'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Image src={"/images/pfp.png"} width={40} height={40} alt='img' />
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-40'>
							<DropdownMenuLabel className='flex justify-center hover:bg-gray-50'>
								<Link href={"profile"}>
									<Button className='bg-transparent '>Profile</Button>
								</Link>
							</DropdownMenuLabel>
							<DropdownMenuLabel className='flex justify-center hover:bg-gray-50'>
								<Button
									className='bg-transparet'
									onClick={() => {
										signOut({ callbackUrl: "/auth/login" });
										dispatch(resetSelectedRow());
									}}
								>
									Signout
								</Button>
							</DropdownMenuLabel>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className=' md:hidden flex'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Menu />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-10'>
						<DropdownMenuLabel className='flex w-full justify-center hover:bg-gray-50'>
							<Link href={"profile"}>
								<Button className='bg-transparent hover:bg-transparent '>
									Profile
								</Button>
							</Link>
						</DropdownMenuLabel>
						<DropdownMenuLabel className='flex w-full justify-center hover:bg-gray-50'>
							<Button
								className='mx-8 p-2 hover:bg-transparent bg-transparent '
								onClick={() => {
									signOut({ callbackUrl: "/auth/login" });
									dispatch(resetSelectedRow());
								}}
							>
								Signout
							</Button>
						</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{/* Dialog Component */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AddInvestorForm isOpen={isDialogOpen} onClose={handleClose} />
			</Dialog>
		</div>
	);
};

export default Navbar;
