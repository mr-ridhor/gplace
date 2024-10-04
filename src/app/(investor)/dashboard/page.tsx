"use client";
import React, { useEffect, useState } from "react";
import Table from "./component/Table"; // Ensure the path to your Table component is correct
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent"; // Ensure this path is correct
import { SearchIcon } from "lucide-react";
import { GrClose } from "react-icons/gr";
import Filter from "@/app/svgComponent/Filter"; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { getPanel, setShowFilter } from "@/lib/slice/panelSlice"; // Ensure these imports are correct
import { Investor } from "@/lib/data/mocked"; // Ensure this path is correct
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Ensure this path is correct

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const { showFilter, showSearch } = useSelector(getPanel);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // State for each filter
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<string | null>(null);
  const [selectedDealSize, setSelectedDealSize] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedGeography, setSelectedGeography] = useState<string | null>(
    null
  );
  const [selectedContactTitle, setSelectedContactTitle] = useState<
    string | null
  >(null);

  // Handle search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedCompany(null); // Reset selected company when typing
  };

  // Handle clear input
  const handleClearInput = () => {
    setSearchValue(""); // Clear search input
    setSelectedCompany(null); // Clear selected company
    // Optionally reset other filters if you want to reset the entire table
    setSelectedCountries([]);
    setSelectedDeals(null);
    setSelectedDealSize(null);
    setSelectedIndustry(null);
    setSelectedGeography(null);
    setSelectedContactTitle(null);
  };

  // Fetch investors data
  useEffect(() => {
    const loadInvestors = async () => {
      try {
        const { data } = await axios.get(`/api/investors`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setInvestors(data);
      } catch (error) {
        console.error("Failed to fetch investors:", error);
        setError("No investor found");
      } finally {
        setLoading(false);
      }
    };

    loadInvestors();
  }, []);

  // Function to extract unique values from an array
  const uniqueValues = <T,>(arr: T[]): T[] => [...new Set(arr)];

  // Get filtered investors
  // Get filtered investors
  const filteredInvestors = investors.filter((investor) => {
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
  // Get unique filter values based on filtered investors
  const uniqueCountries = uniqueValues(
    investors.map((investor) => investor.companyInfo.country)
  );
  const uniqueDeals = uniqueValues(
    filteredInvestors.map((investor) => investor.investmentBio.dealsIn5Y)
  );
  const uniqueDealSizes = uniqueValues(
    filteredInvestors.map((investor) => investor.investmentBio.medianDealSize)
  );
  const uniqueIndustries = uniqueValues(
    filteredInvestors.map((investor) => investor.investmentBio.industry)
  );
  const uniqueGeographies = uniqueValues(
    filteredInvestors.map((investor) => investor.investmentBio.geography)
  );
  const uniqueContactTitles = uniqueValues(
    filteredInvestors.map((investor) => investor.primaryContact.title)
  );

  if (loading)
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );
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
          <div className="px-4 h-[90%]">
            <div className="h-[30%] bg-[#F5F8FA] rounded-md overflow-y-auto no-scrollbar">
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
              {/* Show dropdown only if search value is not empty */}
              {searchValue && (
                <div className="space-y-2 px-3 mt-2">
                  {investors
                    .filter((investor) =>
                      investor.companyInfo.companyName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    ) // Filter based on search value
                    .slice(0, 5)
                    .map((investor, id) => (
                      <div
                        key={id} // Assuming each investor has a unique 'id'
                        className="text-[12px] cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                        onClick={() => {
                          setSelectedCompany(investor.companyInfo.companyName);
                          setSearchValue(investor.companyInfo.companyName); // Update the search value
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
                <AccordionTrigger>Country</AccordionTrigger>
                <AccordionContent>
                  {uniqueCountries.map((country, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => {
                        setSelectedCountries((prev) => {
                          if (prev.includes(country)) {
                            // Remove country if already selected
                            return prev.filter((c) => c !== country);
                          }
                          // Add country if not selected
                          return [...prev, country];
                        });
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deals">
                <AccordionTrigger>Deals in 5 years</AccordionTrigger>
                <AccordionContent>
                  {uniqueDeals.map((deals, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => setSelectedDeals(String(deals))}
                    >
                      {deals}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dealSize">
                <AccordionTrigger>Median Deal Size</AccordionTrigger>
                <AccordionContent>
                  {uniqueDealSizes.map((size, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => setSelectedDealSize(String(size))}
                    >
                      {size}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="industry">
                <AccordionTrigger>Industry</AccordionTrigger>
                <AccordionContent>
                  {uniqueIndustries.map((industry, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => setSelectedIndustry(industry)}
                    >
                      {industry}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="geography">
                <AccordionTrigger>Geography</AccordionTrigger>
                <AccordionContent>
                  {uniqueGeographies.map((geo, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => setSelectedGeography(geo)}
                    >
                      {geo}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contactTitle">
                <AccordionTrigger>Contact Title</AccordionTrigger>
                <AccordionContent>
                  {uniqueContactTitles.map((title, idx) => (
                    <div
                      key={idx}
                      className="text-sm cursor-pointer hover:bg-[#03AAC1] hover:text-white"
                      onClick={() => setSelectedContactTitle(title)}
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
