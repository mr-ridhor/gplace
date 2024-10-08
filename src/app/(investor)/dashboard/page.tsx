"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchInvestorsRequest,
//   fetchInvestorsSuccess,
//   fetchInvestorsFailure,
// } from "./investorsSlice";
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
} from "@/lib/slice/investorSlice";
import { Investor } from "@/lib/data/mocked";
import { getPanel, setShowFilter } from "@/lib/slice/panelSlice"; // Ensure these imports are correct

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
  } = useSelector((state: any) => state.investors);
  const { showFilter, showSearch } = useSelector(getPanel);

  useEffect(() => {
    const loadInvestors = async () => {
      dispatch(fetchInvestorsRequest());
      try {
        const { data } = await axios.get("/api/investors");
        dispatch(fetchInvestorsSuccess(data));
      } catch (error: any) {
        console.log(error);
        dispatch(fetchInvestorsFailure(error.response.data.message));
      }
    };
    loadInvestors();
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    dispatch(setSelectedCompany(null));
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
  };

  const filteredInvestors = investors.filter((investor: Investor) => {
    const {
      companyInfo: { companyName, country } = {},
      investmentBio: { dealsIn5Y, medianDealSize, industry, geography } = {},
      primaryContact: { title } = {},
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

    return (
      countryMatches &&
      dealMatches &&
      dealSizeMatches &&
      industryMatches &&
      geographyMatches &&
      contactTitleMatches &&
      (!selectedCompany ||
        companyName?.toLowerCase() === selectedCompany.toLowerCase()) && // Only show if selectedCompany matches
      (searchValue
        ? companyName?.toLowerCase().includes(searchValue.toLowerCase())
        : true) // Show all if searchValue is empty
    );
  });

  if (loading) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="relative h-[90%] 2xl:h-[98%] py-4 no-scrollbar overflow-y-auto flex gap-x-4">
      {showFilter && (
        <div className="w-[200px] space-y-2 border rounded-md h-full bg p-">
          <div className="h-[5%] justify-between flex items-center gap-x-3 bg-[#DEDEDE] px-4 w-full">
            <div className="flex gap-x-2 h-full items-center">
              <Filter />
              <p>Filter</p>
            </div>
            <GrClose
              className="cursor-pointer"
              onClick={() => dispatch(setShowFilter(false))}
            />
          </div>
          <div className="px-4 overflow-y-auto no-scrollbar h-[90%]">
            <div className="h-max bg-[#F5F8FA] rounded-md overflow-y-auto no-scrollbar">
              <div className="gap-x-4 h-10 px-3 w-full flex items-center">
                <input
                  className="w-[80%] text-[10px] h-[80%] focus:outline-none bg-inherit"
                  placeholder="Type name to search"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <SearchIcon className="h-4 w-4 text-[#3F3F3F]" />
                <GrClose
                  className="cursor-pointer"
                  onClick={handleClearInput}
                />
              </div>
              <hr className="bg-black" />
              {searchValue && (
                <div className="space-y-2 px-3 mt-2">
                  {investors
                    .filter((investor: Investor) =>
                      investor.companyInfo.companyName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )

                    .map((investor: Investor) => (
                      <div
                        key={investor._id}
                        className="text-[12px] cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(
                            setSelectedCompany(investor.companyInfo.companyName)
                          );
                          dispatch(
                            setSearchValue(investor.companyInfo.companyName)
                          );
                        }}
                      >
                        {investor.companyInfo.companyName}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="country">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Country
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map((investor: Investor) => investor.companyInfo.country)
                    .filter(
                      (country: string, index: number, self: string[]) =>
                        self.indexOf(country) === index
                    )
                    .map((country: string, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(setSelectedCountries([country]));
                        }}
                      >
                        {country}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deals">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Deals in 5 years
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map(
                      (investor: Investor) => investor.investmentBio.dealsIn5Y
                    )
                    .filter(
                      (deals: number, index: number, self: number[]) =>
                        self.indexOf(deals) === index
                    )
                    .map((deals: number, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover :text-white"
                        onClick={() => {
                          dispatch(setSelectedDeals(String(deals)));
                        }}
                      >
                        {deals}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dealSize">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Median Deal Size
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map(
                      (investor: Investor) =>
                        investor.investmentBio.medianDealSize
                    )
                    .filter(
                      (size: number, index: number, self: number[]) =>
                        self.indexOf(size) === index
                    )
                    .map((size: number, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(setSelectedDealSize(String(size)));
                        }}
                      >
                        {size}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="industry">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Industry
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map(
                      (investor: Investor) => investor.investmentBio.industry
                    )
                    .filter(
                      (industry: string, index: number, self: string[]) =>
                        self.indexOf(industry) === index
                    )
                    .map((industry: string, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(setSelectedIndustry(industry));
                        }}
                      >
                        {industry}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="geography">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Geography
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map(
                      (investor: Investor) => investor.investmentBio.geography
                    )
                    .filter(
                      (geo: string, index: number, self: string[]) =>
                        self.indexOf(geo) === index
                    )
                    .map((geo: string, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(setSelectedGeography(geo));
                        }}
                      >
                        {geo}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contactTitle">
                <AccordionTrigger className="2xl:text-base text-sm">
                  Contact Title
                </AccordionTrigger>
                <AccordionContent>
                  {investors
                    .map((investor: Investor) => investor.primaryContact.title)
                    .filter(
                      (title: string, index: number, self: string[]) =>
                        self.indexOf(title) === index
                    )
                    .map((title: string, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          dispatch(setSelectedContactTitle(title));
                        }}
                      >
                        {title}
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}

      {/* <div className="h-full w-full overflow-y-auto">
        <Table investors={filteredInvestors} />
      </div> */}
      <div
        className={`h-full flex ${
          showFilter || showSearch ? "flex-1 overflow-x-auto" : "w-full"
        }`}
      >
        <Table investors={filteredInvestors} />
      </div>
    </div>
  );
};

export default Page;
