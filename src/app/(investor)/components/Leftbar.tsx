"use client";
import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Investor } from "@/lib/data/mocked";
import { formatNumberWithCommas } from "@/lib/numeralFormatter";
import Link from "next/link";
import React, { useState } from "react";

interface LeftbarProps {
  list: Investor; // Expecting a MockedData object
}
const Leftbar: React.FC<LeftbarProps> = ({ list }) => {
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    setIsEditingCountry(true);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCountry(e.target.value);
  };

  const handleBlur = () => {
    setIsEditingCountry(false);
    // Here you can make an API call to save the updated country if needed
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingCountry(false);
      // Optionally, make an API call to save the updated country
    }
  };
  // console.log("list", list);
  return (
    <div className="md:w-[200px] fixed w-full hidden md:flex items-start justify-center">
      <div className=" bg-[#F5F8FA] w-full rounded-md min-h-[200px] xl:min-h-[340px] 2xl:min-h-[600px]  md:flex items-start justify-center  overflow-y-auto no-scrollbar py-3 ">
        <div className="space-y-2 xl:space-y-6 2xl:space-y-10 ">
          <div className="my-2">
            <p className="font-bold capitalize">
              {list.companyInfo.companyName}
            </p>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Country</p>
            {/* <p className="text-[12px] lg:text-sm">{list.companyInfo.country}</p> */}
            {isEditingCountry ? (
              <input
                type="text"
                // value={country}
                onChange={handleCountryChange}
                onBlur={handleBlur}
                // onKeyPress={handleKeyPress}
                className="text-[12px] lg:text-sm border border-gray-300 rounded p-1"
                autoFocus
              />
            ) : (
              <p
                className="text-[12px] lg:text-sm cursor-pointer"
                onDoubleClick={handleDoubleClick}
              >
                {list.companyInfo.country}
              </p>
            )}
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Website</p>

            {isEditingCountry ? (
              <input
                type="text"
                // value={country}
                onChange={handleCountryChange}
                onBlur={handleBlur}
                // onKeyPress={handleKeyPress}
                className="text-[12px] lg:text-sm border border-gray-300 rounded p-1"
                autoFocus
              />
            ) : (
              // <p
              //   className="text-[12px] lg:text-sm cursor-pointer"
              //   onDoubleClick={handleDoubleClick}
              // >
              //   {list.companyInfo.country}
              // </p>
              <div className="" onDoubleClick={handleDoubleClick}>
                <Link href={list.companyInfo.website} passHref legacyBehavior>
                  <a
                    className="text-[12px] lg:text-sm text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {list.companyInfo.companyName}
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Founded Year</p>
            <p className="text-[12px] lg:text-sm">
              {list.companyInfo.yearFounded}
            </p>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">
              Number of Employees
            </p>
            <p className="text-[12px] lg:text-sm">
              {formatNumberWithCommas(`${list.companyInfo.employeeNumber}`)}
            </p>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Investor Type</p>
            <div className=" rounded-md text-[12px] lg:text-sm">
              {list.companyInfo.investorType}
            </div>
          </div>
          <div className="space-y-">
            <p className="text-sm lg:text-base text-[#A7A7A7]">
              Matching Score
            </p>
            <div className="w-[70%] flex flex-col items-center">
              <div className="w-fit rounded-full border bg-[#57D08D]  text-gren-600">
                <CircularProgress
                  percentage={list.matchScore.totalScore}
                  circleWidth={40}
                />
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">
              Offered Price ($mm)
            </p>
            <div className=" rounded-md text-[12px] lg:text-sm">
              {/* {list.companyInfo.investorType} */}$
              {formatNumberWithCommas(`${list.offeredPrice.valuation}`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
