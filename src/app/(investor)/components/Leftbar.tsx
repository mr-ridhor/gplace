import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Investor } from "@/lib/data/mocked";
import React from "react";

interface LeftbarProps {
  list: Investor; // Expecting a MockedData object
}
const Leftbar: React.FC<LeftbarProps> = ({ list }) => {
  console.log("list", list);
  return (
    <div className="md:w-[350px] bg-[#F5F8FA] rounded-md h-[100%] overflow-y-auto no-scrollbar py-3 hidden md:flex items-start justify-center">
      <div className="space-y-6 ">
        <div className="my-4">
          <p className="font-bold">{list.companyInfo.companyName}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Country</p>
          <p>{list.companyInfo.country}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Website</p>
          <p className="text-[10px]">{list.companyInfo.website}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Founded Year</p>
          <p>{list.companyInfo.yearFounded}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Number of Employees</p>
          <p>{list.companyInfo.employeeNumber}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Investor Type</p>
          <div className="h-8 rounded-md">{list.companyInfo.investorType}</div>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Matching Score</p>
          <div className="w-fit rounded-full border bg-[#57D08D]  text-gren-600">
            <CircularProgress
              percentage={list.matchScore.totalScore}
              circleWidth={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
