import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuPencil } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PersonalnfoForm from "./components/PersonalnfoForm";
import CompanyInfoForm from "./components/CompanyInfoForm";
import TeamInfoForm from "./components/TeamInfoForm";

const page = () => {
  return (
    <div className="w-full py-5 flex flex-col items-center gap-y-5 text-sm overflow-y-auto no-scrollbar h-[90%]">
      <div className="w-[85%] ">
        <div className="space-y-2 ">
          <div className="flex gap-x-2">
            <Image
              src={"/images/pfp (1).png"}
              width={100}
              height={100}
              className=""
              alt="img"
            />
            <div className="space-y-2">
              <p className="font-bold">Edward NewGate</p>
              <p className="text-[#808080]">CEO WBpirates Inc.</p>
              <p className="text-[#808080]">Kigali, Rwanda</p>
            </div>
          </div>
          <div className="grid-cols-1 grid gap-y-2 md:flex gap-x-2 ">
            <Link href={""}>
              <Button className="text-sm text-white">
                Click here to update plan
              </Button>
            </Link>
            <Link href={""}>
              <Button className="text-sm  bg-[#D8D8D8] hover:bg-[#D8D8D8]/50">
                Check Payment History
              </Button>
            </Link>
            <Link href={""}>
              <Button className="bg-transparent hover:bg-transparent text-sm ">
                Cancel current plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center h-full">
          <p>Personal Information</p>
          {/* <Button className="bg-transparent hover:bg-transparent text-[#808080] h-fit items-center flex gap-x-2">
            Edit
            <LuPencil />
          </Button> */}

          <Dialog>
            <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
              Edit
              <LuPencil />
            </DialogTrigger>

            <PersonalnfoForm />
          </Dialog>
        </div>
      </div>
      <div className="w-[85%]  space-y-6">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">First Name</p>
            <p>Edwward</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Last Name</p>
            <p>NewGate</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Title</p>
            <p>CEO</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p className="line-clamp-3 md:line-clamp-0">
              WhiteBeard.pirates@email.com
            </p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Phone number</p>
            <p>(123) 456-7890</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">LinkedIn</p>
            <p>@WhiteBInclinkedIn</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">X</p>
            <p>@WhiteBIncX</p>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Country</p>
            <p>Wano</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">City</p>
            <p>Onigashima</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Address</p>
            <p>Random address off 49 street</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center">
          <p>Company Information</p>
          {/* <Button className="bg-transparent hover:bg-transparent text-[#808080] h-fit items-center flex gap-x-2">
            Edit
            <LuPencil />
          </Button> */}
          <Dialog>
            <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
              Edit
              <LuPencil />
            </DialogTrigger>
            <CompanyInfoForm />
          </Dialog>
        </div>
      </div>
      <div className="w-[85%]  space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Company Name</p>
            <p>WhiteBread Steel Inc.</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Country</p>
            <p>Wano</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">City</p>
            <p>Onihashima</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Comapany Email</p>
            <p>WhiteBeard.pirates@email.com</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Founding Year</p>
            <p>1990</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Industry</p>
            <p>Steel</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Website</p>
            <p>wwebsiteexm.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-[100%]">
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Revenue (LTM, $K)</p>
            <p>$1,123.12</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Revenue (Previous year, $K) </p>
            <p>$1,234.20</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Gross Profit(LTM, $K) </p>
            <p>$1,234.20</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Gross profit(Previous year, $K) </p>
            <p>$120</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">EBIDTA</p>
            <p>$1,12.12</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">EBIDTA (Previous year, $K) </p>
            <p>$3,34.20</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center">
          <p>Team Credential</p>
          {/* <Button className="bg-transparent hover:bg-transparent text-[#808080] h-fit items-center flex gap-x-2">
            Edit
            <LuPencil />
          </Button> */}
          <Dialog>
            <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
              Edit
              <LuPencil />
            </DialogTrigger>
            <TeamInfoForm />
          </Dialog>
        </div>
      </div>
      <div className="w-[85%]  space-y-6">
        <div className="grid grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">User 1</p>
            <p>Mr John Doe</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p>example@gmail.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">User 2</p>
            <p>Clifford Ray</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p>example@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center">
          <p>Log in credential</p>
          <Button className="bg-transparent hover:bg-transparent text-[#808080] h-fit items-center flex gap-x-2">
            Edit
            <LuPencil />
          </Button>
        </div>
      </div>
      <div className="w-[85%]  space-y-6">
        <div className="grid grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Username</p>
            <p>WhitebeardCRM</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Password</p>
            <p>**********</p>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button className="flex gap-x-2 bg-transparent hover:bg-transparent">
            Log out <GrLogout />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
