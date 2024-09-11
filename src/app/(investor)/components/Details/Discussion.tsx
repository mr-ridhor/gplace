"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Investor } from "@/lib/data/mocked";
import Link from "next/link";
import React from "react";
import { BiLogoTelegram } from "react-icons/bi";
interface Props {
  selectedItem: Investor;
}
const Discussion: React.FC<Props> = ({ selectedItem }) => {
  const data = [
    {
      id: 1,
      header: "Primary Contact",
      name: "Hallme Nezihe",
    },
    {
      id: 2,
      header: "# of Deals in 5 Years",
      name: 21,
    },
    {
      id: 3,
      header: "Median Deal Size ($ mm)",
      name: "$65.00",
    },
    {
      id: 4,
      header: "AUM ($ mm)",
      name: "$325.00",
    },
  ];
  console.log(selectedItem);
  return (
    <TabsContent value="discussion" className="space-y-4">
      {/* <div className="grid gap-x-5 gap-y-2 grid-cols-2 lg:grid-cols-4 w-full">
        {data.map((list, id) => {
          return (
            <Card
              key={id}
              className="border-l-2 flecenter border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-fit col-span-1"
            >
              <CardContent className="h-[100px] gap-y-2 flex flex-col justify-center  tems-center">
                <p className="text-[10px] lg:text-sm">{list.header}</p>
                <p className="font-medium text-[10px] lg:text-sm">
                  {list.name}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div> */}
      <div className="grid gap-x-5 grid-cols-4 w-full">
        <Card className="border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] col-span-1">
          <CardContent className="h-[100px] gap-y-2 flex flex-col justify-center  tems-center">
            <p className="text-[10px] lg:text-sm">Primary Contact</p>
            <p className="font-medium text-[10px] lg:text-sm">
              {selectedItem.primaryContact.name}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1">
          <CardContent className="h-[100px] gap-y-2 flex flex-col justify-center  tems-center">
            <p className="text-[10px] lg:text-sm"># of Deals in 5 Years</p>
            <p className="font-medium text-[10px] lg:text-sm">
              {selectedItem.investmentBio.dealsIn5Y}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1">
          <CardContent className="h-[100px] gap-y-2 flex flex-col justify-center  tems-center">
            <p className="text-[10px] lg:text-sm">Median Deal Size ($ mm)</p>
            <p className="font-medium text-[10px] lg:text-sm">
              {selectedItem.investmentBio.medianDealSize}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1">
          <CardContent className="h-[100px] gap-y-2 flex flex-col justify-center  tems-center">
            <p className="text-[10px] lg:text-sm">AUM ($ mm)</p>
            <p className="font-medium text-[10px] lg:text-sm">
              {selectedItem.investmentBio.AUM}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full gap-y-2 md:grid-cols-2 text-[10px] lg:text-sm grid gap-x-4 ">
        <Card className="border col-span-1 b">
          <CardHeader className="text-[#898989]">
            <p>Description</p>
          </CardHeader>
          <CardContent className="text-[10px] lg:text-sm ">
            {selectedItem.companyInfo.description}
          </CardContent>
        </Card>
        <Card className="border col-span-1">
          <CardHeader className="text-[#898989]">
            <p>Investment Profile</p>
          </CardHeader>
          <CardContent className="text-[10px] lg:text-sm w-full space-y-4">
            <div className="w-full lg:w-[80%] justify-between h-1/2 flex ap-x-3">
              <div className="space-y-2">
                <p className="text-[8px] lg:text-sm">Investment industry</p>
                <div className="bg-[#F5E2B7] rounded-md flex items-center w-[100px] justify-center h-8">
                  <p>{selectedItem.investmentBio.industry}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[8px] lg:text-sm">Investment Geographies</p>
                <div className="bg-[#E4DAF4] rounded-md flex items-center w-[100px] justify-center h-8">
                  <p>{selectedItem.investmentBio.geography}</p>
                </div>
              </div>
            </div>
            <div className="h2">
              <div className="">
                <p># of Deals in LTM</p>
                <p>{selectedItem.investmentBio.dealsInLTM}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full p-4 border rounded-md space-y-4 text-[10px] lg:text-sm">
        <div className="flex w-full justify-between items-center">
          <p className="text-[#898989]">Typical Acquisition Target</p>
          <Button className="text-[10px] lg:text-sm text-white flex gap-x-1 items-center">
            <Link href={""}>Request Info</Link>
            <BiLogoTelegram />
          </Button>
        </div>
        <div className="grid-cols-3 grid w-full">
          <div className="col-span-1">
            <p className="">Revenue ($ mm)</p>
            <p className="">
              {selectedItem.paidInfo.revenue.from}-
              {selectedItem.paidInfo.revenue.to}
            </p>
          </div>
          <div className="col-span-1">
            <p className="">EBITDA ($ mm)</p>
            <p className="">
              {selectedItem.paidInfo.EBITDA.from}-{" "}
              {selectedItem.paidInfo.EBITDA.to}
            </p>
          </div>
          <div className="col-span-1">
            <p className="">Deal Size ($ mm)</p>
            <p className="">
              ${selectedItem.targetInfo.dealSize.from} - $
              {selectedItem.targetInfo.dealSize.to}
            </p>
          </div>
        </div>
      </div>
      <div className="w-fulltext-[10px] lg:text-sm p-4 border rounded-md space-y-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-[#898989]">Typical Price Paid</p>
          <Button className="text-[10px] lg:text-sm text-white flex gap-x-1 items-center">
            <Link href={""}>Request Info</Link>
            <BiLogoTelegram />
          </Button>
        </div>
        <div className="text-[10px] lg:text-sm grid-cols-3 grid w-full">
          <div className="col-span-1">
            <p className="">Valuation ($ mm)</p>
            <p className="">
              ${selectedItem.paidInfo.valuation.from} - $
              {selectedItem.paidInfo.valuation.to}
            </p>
          </div>
          <div className="col-span-1">
            <p className="">EV/Revenue</p>
            <p className="">
              {selectedItem.targetInfo.revenue.from} - $
              {selectedItem.targetInfo.revenue.from}
            </p>
          </div>
          <div className="col-span-1">
            <p className="">EV/EBITDA</p>
            <p className="">
              ${selectedItem.paidInfo.revenue.from} - $
              {selectedItem.targetInfo.EBITDA.to}{" "}
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default Discussion;
