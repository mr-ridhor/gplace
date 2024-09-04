import Filter from "@/app/svgComponent/Filter";
import Logo from "@/app/svgComponent/Logo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-16 px-5 sticky top-0 z-10 flex items-center justify-between bg-[#F5F8FA]">
      <div className="flex">
        <div className=" bg-red00">
          <Logo width={180} height={60} />
        </div>
        <Tabs defaultValue="secrets" className="w- p-2 ">
          <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-12 p-0 ">
            <TabsTrigger
              value="secrets"
              className="w-1/3 h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Investors
            </TabsTrigger>
            <TabsTrigger
              value="variables"
              className="w-1/3 h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Variables
            </TabsTrigger>
            <TabsTrigger
              value="rotation"
              className="w-1/3 h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Rotation
            </TabsTrigger>
          </TabsList>
          {/* <SecretsTab />
          <VariablesTab />
          <RotationTab /> */}
        </Tabs>
      </div>
      <div className="flex items-center h-full gap-x-4 bg-red-0 justify-end">
        <div className="flex gap-x-2 items-center h-full">
          <Filter />
          <p>Filter</p>
        </div>
        <div className="h-1/2 items-center flex gap-x bordr w-1/4">
          <Search size={14} />
          <input
            placeholder="Search"
            className=" focus-visible:outline-none h-1/2 px-2 w-[90%] bg-inherit"
          />
        </div>
        <Button className="bg-[#03AAC1] text-white">Add New</Button>
        <div className="">
          <p>Mr Ed.</p>
        </div>
        <div className="">
          <Image
            src={"/images/pfp (1).png"}
            width={40}
            height={40}
            className=""
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
