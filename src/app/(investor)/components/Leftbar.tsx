import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Investor } from "@/lib/data/mocked";
import { formatNumberWithCommas } from "@/lib/numeralFormatter";
import Link from "next/link";
import React from "react";

interface LeftbarProps {
  list: Investor; // Expecting a MockedData object
}
const Leftbar: React.FC<LeftbarProps> = ({ list }) => {
  console.log("list", list);
  return (
    <div className="md:w-[200px] fixed w-full hidden md:flex items-start justify-center">
      <div className=" bg-[#F5F8FA] w-full rounded-md min-h-[200px] xl:min-h-[340px] 2xl:min-h-[600px]  md:flex items-start justify-center  overflow-y-auto no-scrollbar py-3 ">
        <div className="space-y-4 xl:space-y-6 2xl:space-y-10 ">
          <div className="my-4">
            <p className="font-bold capitalize">
              {list.companyInfo.companyName}
            </p>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Country</p>
            <p className="text-[12px] lg:text-sm">{list.companyInfo.country}</p>
          </div>
          <div className="">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Website</p>
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
            <div className="h-8 rounded-md text-[12px] lg:text-sm">
              {list.companyInfo.investorType}
            </div>
          </div>
          <div className="space-y-2">
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
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
