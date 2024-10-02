import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Discussion from "./Details/Discussion";
import Data from "./Details/Data";
import Inactive from "./Details/Inactive";
import Letter from "./Details/Letter";
import Deligence from "./Details/Deligence";
import Closing from "./Details/Closing";
import { Investor } from "@/lib/data/mocked";
interface Props {
  selectedItem: Investor;
}
const Detailed: React.FC<Props> = ({ selectedItem }) => {
  return (
    <TabsContent value="detail" className="w-full overflow-x-aut">
      <div className="mt-4">
        <p>Transaction Status</p>
        <Tabs
          defaultValue="discussion"
          className="w-full text-sm  overflow-x-aut "
        >
          <TabsList className="flex md:grid w-full text-sm  justify-start  grid-cols-6 border bg-inherit mt-2 overflow-x-auto lg:overflow-hidden">
            <TabsTrigger
              className=" text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
              value="discussion"
            >
              Initial Discussion
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] lg:text-sm   data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
              value="data"
            >
              Data Exchange
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
              value="inactive"
            >
              Inactive Offer
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
              value="letter"
            >
              Letter of Intent
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
              value="due"
            >
              Due Diligence
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] lg:text-sm   data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] data-[state=active]:shadow-none rounded-none"
              value="closing"
            >
              Closing
            </TabsTrigger>
          </TabsList>
          <Discussion selectedItem={selectedItem} />
          <Data />
          <Inactive />
          <Letter />
          <Deligence />
          <Closing />
        </Tabs>
      </div>
    </TabsContent>
  );
};

export default Detailed;
