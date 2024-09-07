"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import ContactHeader from "./ContactHeader";
import { BiLogoTelegram } from "react-icons/bi";
import Table from "./Table";

const ContactPage = () => {
  return (
    <div className="w-full space-y-3 my-2">
      <ContactHeader />
      <div className="border rounded-md w-full text-[10px] md:text-sm p-3 space-y-4 shadow shadow-gray-200">
        <div className="flex justify-between w-full">
          <div className="flex gap-x-2 h-fit items-center">
            <p>Halime Nezihe</p>
            <div className="w-fit h-8 px-2 items-center flex bg-[#FCF0FD] rounded-md ">
              <p>Primary Contact</p>
            </div>
          </div>
          <div className="text-black h-8">
            <Button className="h-full items-center flex gap-x-1 bg-[#DCF8FC] hover:bg-[#DCF8FC]/60">
              View record <BiLogoTelegram />
            </Button>
          </div>
        </div>
        <div className="w-full grid-cols-2 gap-y-2 md:grid-cols-3 grid gap-x-2 ">
          <div className="col-span-1 space-y-1">
            <p>Title</p>
            <p>Lead program manager</p>
          </div>
          <div className="col-span-1 space-y-1">
            <p>Phone</p>
            <p>+1 456 337 981</p>
          </div>
          <div className="col-span-1 space-y-1">
            <p>Email</p>
            <p>loremipsum@gmail.com</p>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default ContactPage;
