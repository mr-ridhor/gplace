import CircularProgress from "@/app/svgComponent/CircularProgress";
import { MockedData } from "@/lib/data/mocked";
import React from "react";

interface LeftbarProps {
  list: MockedData; // Expecting a MockedData object
}
const Leftbar: React.FC<LeftbarProps> = ({ list }) => {
  return (
    <div className="md:w-[350px] bg-[#F5F8FA] rounded-md h-[100%] overflow-y-auto no-scrollbar py-3 hidden md:flex items-start justify-center">
      <div className="space-y-6 ">
        <div className="my-4">
          <p className="font-bold">{list.name}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Country</p>
          <p>{list.country}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Website</p>
          <p>{list.website}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Founded Year</p>
          <p>{list.dealsIn5Years}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Number of Employees</p>
          <p>{list.dealsIn5Years}</p>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Investor Type</p>
          <div className="h-8 rounded-md">{list.dealsIn5Years}</div>
        </div>
        <div className="">
          <p className="text-sm text-[#A7A7A7]">Matching Score</p>
          <div className="w-fit rounded-full border bg-[#57D08D]  text-gren-600">
            <CircularProgress percentage={list.match} circleWidth={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
