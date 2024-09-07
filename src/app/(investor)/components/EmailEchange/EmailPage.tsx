"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AllEMails from "./AllEMails";
import SentEmails from "./SentEmails";
import RecievedEMails from "./RecievedEMails";

const EmailPage = () => {
  return (
    <div className="w-full space-y-3 my-3 text-[10px] lg:text-sm">
      <div className="flex gap-x-1">
        <p>Email</p>
        <p className="text-[#d9d9d9]"> (Synced to your company email)</p>
      </div>
      <Tabs
        defaultValue="all"
        className="w-full text-sm  overflow-x-hidden overflow-y-hidden "
      >
        <TabsList className="grid w-full md:w-[400px] text-sm  justify-start  grid-cols-3 border bg-inherit mt-2 overflow-x-auto overflow-y-hidden">
          <TabsTrigger
            className=" text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
            value="all"
          >
            All Emails
          </TabsTrigger>
          <TabsTrigger
            className="text-[10px] lg:text-sm   data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
            value="sent"
          >
            Sent Emails
          </TabsTrigger>
          <TabsTrigger
            className="text-[10px] lg:text-sm  data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-[#DCF8FC] rounded-md data-[state=active]:shadow-none"
            value="recieved"
          >
            Recieved Emails
          </TabsTrigger>
        </TabsList>
        <AllEMails />
        <SentEmails />
        <RecievedEMails />
      </Tabs>
    </div>
  );
};

export default EmailPage;
