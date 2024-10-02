"use client";

import React, { useEffect, useState } from "react";
import Table from "./component/Table";
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent";
import { SearchIcon } from "lucide-react";
import { GrClose } from "react-icons/gr";
import Filter from "@/app/svgComponent/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getPanel, setShowFilter } from "@/lib/slice/panelSlice";
import { Investor } from "@/lib/data/mocked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const { showFilter, showSearch } = useSelector(getPanel);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  // Handle search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Clear input field
  const handleClearInput = () => {
    setSearchValue("");
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

  // Filter investors based on primary contact name, email, or phone
  const filteredInvestors = investors.filter((investor) => {
    const { name, surname } = investor.primaryContact || {};
    const fullName = `${name} ${surname}`.toLowerCase();

    return fullName.includes(searchValue.toLowerCase());
  });

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
              </div>
              <hr className="bg-black" />
              <div className="p-2 flex w-full justify-cente flex-col ites-center">
                {filteredInvestors.map((investor) => {
                  const { name, surname } = investor.primaryContact;
                  const fullName = `${name} ${surname}`;
                  return (
                    <div
                      key={investor._id}
                      className="text-sm w-[90%] truncate text-[#3F3F3F]"
                    >
                      {fullName}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-[60%] overflow-y-auto no-scrollbar">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-companies-country">
                  <AccordionTrigger className="text-[10px]">
                    Country
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.companyInfo.country}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-websites">
                  <AccordionTrigger className="text-[10px]">
                    Websites
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {/* <a
                            href={investor.companyInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          > */}
                          {investor.companyInfo.website}
                          {/* </a> */}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-investmentBio">
                  <AccordionTrigger className="text-[10px]">
                    Investment Industry
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.investmentBio.industry}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-investmentBio-geo">
                  <AccordionTrigger className="text-[10px]">
                    Investment geo.
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.investmentBio.geography}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-investmentBio-5y">
                  <AccordionTrigger className="text-[10px]">
                    # Deals in 5 years
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.investmentBio.dealsIn5Y}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-investmentBio-dSizes">
                  <AccordionTrigger className="text-[10px]">
                    Deal Size ($M)
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.investmentBio.medianDealSize}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-primarycontact-ti">
                  <AccordionTrigger className="text-[10px]">
                    Primary Contact
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.primaryContact.title}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-statusi">
                  <AccordionTrigger className="text-[10px]">
                    Status
                  </AccordionTrigger>
                  {/* <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.primaryContact.title}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent> */}
                </AccordionItem>
                <AccordionItem value="item-match">
                  <AccordionTrigger className="text-[10px]">
                    Match
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {filteredInvestors.map((investor) => (
                        <li key={investor._id}>
                          {investor.matchScore.totalScore}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
