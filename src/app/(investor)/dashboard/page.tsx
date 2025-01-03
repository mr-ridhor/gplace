"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Table from "./component/Table";
import LoaderComponent from "@/components/LoaderComponent";
import { SearchIcon } from "lucide-react";
import { GrClose } from "react-icons/gr";
import Filter from "@/app/svgComponent/Filter";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	fetchInvestorsRequest,
	fetchInvestorsSuccess,
	fetchInvestorsFailure,
	setSearchValue,
	setSelectedCompany,
	setSelectedCountries,
	setSelectedDeals,
	setSelectedDealSize,
	setSelectedIndustry,
	setSelectedGeography,
	setSelectedContactTitle,
	setSelectedOfferedPrice,
} from "@/lib/slice/investorSlice";
import { Investor } from "@/lib/data/mocked";
import { getPanel, setShowFilter } from "@/lib/slice/panelSlice";

const Page: React.FC = () => {
	const dispatch = useDispatch();
	const {
		investors,
		loading,
		error,
		searchValue,
		selectedCompany,
		selectedCountries,
		selectedDeals,
		selectedDealSize,
		selectedIndustry,
		selectedGeography,
		selectedContactTitle,
		selectedOfferedPrice,
	} = useSelector((state: any) => state.investors);
	const { showFilter } = useSelector(getPanel);

	const [countrySearch, setCountrySearch] = useState<string>("");
	const [dealSearch, setDealSearch] = useState<string>("");
	const [dealSizeSearch, setDealSizeSearch] = useState<string>("");
	const [industrySearch, setIndustrySearch] = useState<string>("");
	const [geoSearch, setGeoSearch] = useState<string>("");
	const [contactTitleSearch, setContactTitleSearch] = useState<string>("");
	const [offeredPriceSearch, setOfferedPriceSearch] = useState<string>("");

	useEffect(() => {
		const loadInvestors = async () => {
			dispatch(fetchInvestorsRequest());
			try {
				const { data } = await axios.get("/api/investors");
				console.log(data);
				dispatch(fetchInvestorsSuccess(data));
			} catch (error: any) {
				console.log(error);
				dispatch(fetchInvestorsFailure(error.response.data.message));
			}
		};
		loadInvestors();
	}, [dispatch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(setSearchValue(value));

		// If the input is cleared, reset all filters
		if (value === "") {
			handleClearInput();
		}
	};

	const handleClearInput = () => {
		dispatch(setSearchValue(""));
		dispatch(setSelectedCompany(null));
		dispatch(setSelectedCountries([]));
		dispatch(setSelectedDeals(null));
		dispatch(setSelectedDealSize(null));
		dispatch(setSelectedIndustry(null));
		dispatch(setSelectedGeography(null));
		dispatch(setSelectedContactTitle(null));
		dispatch(setSelectedOfferedPrice(null));
	};
	// const { offeredPrice } = investors;
	console.log("here", investors);
	const filteredInvestors = investors.filter((investor: Investor) => {
		const {
			companyInfo: { companyName, country } = {},
			investmentBio: { dealsIn5Y, medianDealSize, industry, geography } = {},
			primaryContact: { title } = {},
			offeredPrice: { valuation } = {},
		} = investor;

		const countryMatches =
			selectedCountries.length === 0 ||
			(country !== undefined && selectedCountries.includes(country));
		const dealMatches = !selectedDeals || dealsIn5Y === Number(selectedDeals);
		const dealSizeMatches =
			!selectedDealSize || medianDealSize === Number(selectedDealSize);
		const industryMatches = !selectedIndustry || industry === selectedIndustry;
		const geographyMatches =
			!selectedGeography || geography === selectedGeography;
		const contactTitleMatches =
			!selectedContactTitle || title === selectedContactTitle;
		// const offeredPriceMatches =
		// 	!selectedOfferedPrice || valuation === Number(selectedOfferedPrice);
		const offeredPriceMatches =
			!selectedOfferedPrice ||
			(valuation !== undefined && valuation === Number(selectedOfferedPrice)); // Added check for undefined

		return (
			countryMatches &&
			dealMatches &&
			dealSizeMatches &&
			industryMatches &&
			geographyMatches &&
			contactTitleMatches &&
			offeredPriceMatches &&
			(!selectedCompany ||
				companyName?.toLowerCase() === selectedCompany.toLowerCase()) &&
			(searchValue
				? companyName?.toLowerCase().includes(searchValue.toLowerCase())
				: true)
		);
	});

	const uniqueCompanies = [
		...new Set(
			investors.map(
				(inv: { companyInfo: { companyName: any } }) =>
					inv.companyInfo.companyName
			)
		),
	];
	const uniqueCountries = [
		...new Set(
			investors.map(
				(inv: { companyInfo: { country: any } }) => inv.companyInfo.country
			)
		),
	];
	const uniqueDeals = [
		...new Set(
			investors.map(
				(inv: { investmentBio: { dealsIn5Y: any } }) =>
					inv.investmentBio.dealsIn5Y
			)
		),
	];
	const uniqueDealSizes = [
		...new Set(
			investors.map(
				(inv: { investmentBio: { medianDealSize: any } }) =>
					inv.investmentBio.medianDealSize
			)
		),
	];
	const uniqueIndustries = [
		...new Set(
			investors.map(
				(inv: { investmentBio: { industry: any } }) =>
					inv.investmentBio.industry
			)
		),
	];
	const uniqueGeographies = [
		...new Set(
			investors.map(
				(inv: { investmentBio: { geography: any } }) =>
					inv.investmentBio.geography
			)
		),
	];
	const uniqueContactTitles = [
		...new Set(
			investors.map(
				(inv: { primaryContact: { title: any } }) => inv.primaryContact.title
			)
		),
	];
	const uniqueOffferedPrice = [
		...new Set(
			investors.map(
				(inv: {
					offeredPrice: {
						valuation: any;
					};
				}) => inv.offeredPrice.valuation
			)
		),
	];

	if (loading) {
		return (
			<div className='w-full h-72 flex items-center justify-center'>
				<LoaderComponent className='w-8 h-8 text-[#03AAC1]' />
			</div>
		);
	}
	if (error) return <div>{error}</div>;

	return (
		<div className='relative h-[90%] 2xl:h-[98%] py-4 no-scrollbar overflow-y-auto flex gap-x-4'>
			{showFilter && (
				<div className='w-[200px] space-y-2 border rounded-md h-full bg'>
					<div className='h-[5%] justify-between flex items-center gap-x-3 bg-[#DEDEDE] px-4 w-full'>
						<div className='flex gap-x-2 h-full items-center'>
							<Filter />
							<p>Filter</p>
						</div>
						<GrClose
							className='cursor-pointer'
							onClick={() => dispatch(setShowFilter(false))}
						/>
					</div>
					<div className='px-4 overflow-y-auto no-scrollbar h-[90%]'>
						<div className='h-max bg-[#F5F8FA] rounded-md overflow-y-auto no-scrollbar'>
							<div className='gap-x-4 h-10 px-3 w-full flex items-center'>
								<SearchIcon className='h-4 w-4 text-[#3F3F3F]' />

								<input
									className='w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
									placeholder='Type name to search'
									value={searchValue}
									onChange={handleInputChange}
								/>
								<GrClose
									className='cursor-pointer'
									onClick={handleClearInput}
								/>
							</div>
							<hr className='bg-black' />
							{searchValue && (
								<div className='space-y-2 px-3 mt-2'>
									{uniqueCompanies
										.filter((company: any) =>
											company.toLowerCase().includes(searchValue.toLowerCase())
										)
										.map((company: any) => (
											<div
												key={company}
												className='text-[12px] cursor-pointer hover:bg-[#03AAC1] hover:text-white'
												onClick={() => {
													dispatch(setSelectedCompany(company));
													dispatch(setSearchValue(company));
												}}
											>
												{company}
											</div>
										))}
								</div>
							)}
						</div>

						<Accordion type='single' collapsible>
							{/* Country Accordion */}
							<AccordionItem value='country'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Country
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search country'
											value={countrySearch}
											onChange={(e) => setCountrySearch(e.target.value)}
											className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer'
											onClick={() => {
												setCountrySearch("");
												dispatch(setSelectedCountries([])); // Reset selected countries
											}}
										/>
									</div>
									{countrySearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueCountries
												.filter((country: any) =>
													country
														.toLowerCase()
														.includes(countrySearch.toLowerCase())
												)
												.map((country: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedCountries([country]));
														}}
													>
														{country}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>

							{/* Deals Accordion */}
							<AccordionItem value='deals'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Deals in 5 years
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search deals'
											value={dealSearch}
											onChange={(e) => setDealSearch(e.target.value)}
											className='w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'

											// className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer h-3 w-3'
											onClick={() => {
												setDealSearch("");
												dispatch(setSelectedDeals(null)); // Reset selected deals
											}}
										/>
									</div>
									{dealSearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueDeals
												.filter((deal) => String(deal).includes(dealSearch))
												.map((deal: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedDeals(String(deal)));
														}}
													>
														{deal}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>

							{/* Median Deal Size Accordion */}
							<AccordionItem value='dealSize'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Median Deal Size
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search deal size'
											value={dealSizeSearch}
											onChange={(e) => setDealSizeSearch(e.target.value)}
											className='w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'

											// className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer'
											onClick={() => {
												setDealSizeSearch("");
												dispatch(setSelectedDealSize(null)); // Reset selected countries
											}}
										/>
									</div>
									{dealSizeSearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueDealSizes
												.filter((size) => String(size).includes(dealSizeSearch))
												.map((size: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedDealSize(String(size)));
														}}
													>
														{size}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>

							{/* Industry Accordion */}
							<AccordionItem value='industry'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Industry
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search industry'
											value={industrySearch}
											onChange={(e) => setIndustrySearch(e.target.value)}
											className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											w-3className='cursor-pointer h-3 w-3'
											onClick={() => {
												setIndustrySearch("");
												dispatch(setSelectedIndustry(null)); // Reset selected countries
											}}
										/>
									</div>
									{industrySearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueIndustries
												.filter((industry: any) =>
													industry
														.toLowerCase()
														.includes(industrySearch.toLowerCase())
												)
												.map((industry: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedIndustry(industry));
														}}
													>
														{industry}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>

							{/* Geography Accordion */}
							<AccordionItem value='geography'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Geography
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search geography'
											value={geoSearch}
											onChange={(e) => setGeoSearch(e.target.value)}
											className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer h-3 w-3'
											onClick={() => {
												setGeoSearch("");
												dispatch(setSelectedGeography(null)); // Reset selected countries
											}}
										/>
									</div>
									{geoSearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueGeographies
												.filter((geo: any) =>
													geo.toLowerCase().includes(geoSearch.toLowerCase())
												)
												.map((geo: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedGeography(geo));
														}}
													>
														{geo}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>

							{/* Contact Title Accordion */}
							<AccordionItem value='contactTitle'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Contact Title
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search contact title'
											value={contactTitleSearch}
											onChange={(e) => setContactTitleSearch(e.target.value)}
											className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer h-3 w-3'
											onClick={() => {
												setContactTitleSearch("");
												dispatch(setSelectedContactTitle(null)); // Reset selected countries
											}}
										/>
									</div>
									{contactTitleSearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueContactTitles
												.filter((title: any) =>
													title
														.toLowerCase()
														.includes(contactTitleSearch.toLowerCase())
												)
												.map((title: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(setSelectedContactTitle(title));
														}}
													>
														{title}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='offeredPrice'>
								<AccordionTrigger className='2xl:text-base text-sm'>
									Offered Price
								</AccordionTrigger>
								<AccordionContent>
									<div className='flex w-full justify-between items-center'>
										<input
											placeholder='Search Offer Price'
											value={offeredPriceSearch}
											onChange={(e) => setOfferedPriceSearch(e.target.value)}
											className='mb-2 w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit'
										/>
										<GrClose
											className='cursor-pointer h-3 w-3'
											onClick={() => {
												setOfferedPriceSearch("");
												dispatch(setSelectedOfferedPrice(null)); // Reset selected countries
											}}
										/>
									</div>
									{offeredPriceSearch && (
										<div className='space-y-2 px-3 mt-2'>
											{uniqueOffferedPrice
												.filter((offeredPrice) =>
													String(offeredPrice).includes(offeredPriceSearch)
												)
												.map((offeredPrice: any, idx) => (
													<div
														key={idx}
														className='text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white'
														onClick={() => {
															dispatch(
																setSelectedOfferedPrice(String(offeredPrice))
															);
														}}
													>
														{offeredPrice}
													</div>
												))}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			)}

			<div
				className={`h-full flex ${
					showFilter ? "flex-1 overflow-x-auto" : "w-full"
				}`}
			>
				<Table investors={filteredInvestors} />
			</div>
		</div>
	);
};

export default Page;
