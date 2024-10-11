"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PersonalnfoForm from "./components/PersonalnfoForm";
import CompanyInfoForm from "./components/CompanyInfoForm";
import TeamInfoForm from "./components/TeamInfoForm";
import axios from "axios";
import formatPrice from "../../../../utils/formtPrice";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, setProfile } from "@/lib/slice/profileSlice";
import LoaderComponent from "@/components/LoaderComponent";

const page = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  useEffect(() => {
    setLoading(true); // Start loading
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setProfile(data));
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading on error
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    ); // Render loader while loading
  }

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
              <p className="font-bold">
                {profile?.bio?.firstName} {profile?.bio?.lastName}
              </p>
              <p className="text-[#808080]">
                {profile?.bio?.title} {profile?.company?.name}.
              </p>
              <p className="text-[#808080]">
                {profile?.bio?.city}, {profile?.bio?.country}
              </p>
            </div>
          </div>
          <div className="grid-cols-1 grid gap-y-2 md:flex gap-x-2 ">
            <Link href={""}>
              <Button className="text-sm text-white hover:bg-[#0691A5]">
                Click here to update plan
              </Button>
            </Link>
            <Link href={""}>
              <Button className="text-sm  bg-[#D8D8D8] hover:bg-[#D8D8D8]/50">
                Check Payment History
              </Button>
            </Link>
            <Link href={""}>
              <Button className="bg-transparent hover:border hover:border-[#D9D9D9] hover:bg-transparent text-sm ">
                Cancel current plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center h-full">
          <p>Personal Information</p>

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
            <p>{profile?.bio?.firstName}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Last Name</p>
            <p>{profile?.bio?.lastName}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Title</p>
            <p>{profile?.bio?.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p className="line-clamp-3 md:line-clamp-0">
              {profile?.bio?.email}
            </p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Phone number</p>
            <p>{profile?.bio?.phone}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">LinkedIn</p>
            <p>{profile?.bio?.linkedIn}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">X</p>
            <p>{profile?.bio?.x}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Country</p>
            <p>{profile?.bio?.country}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">City</p>
            <p>{profile?.bio?.city}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Address</p>
            <p>{profile?.bio?.address}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center">
          <p>Company Information</p>

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
            <p>{profile?.company?.name}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Country</p>
            <p>{profile?.company?.country}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">City</p>
            <p>{profile?.company?.city}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Comapany Email</p>
            <p>{profile?.company?.email}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Founding Year</p>
            <p>{profile?.company?.foundingYear}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Industry</p>
            <p>{profile?.company?.industry}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Website</p>
            <p>{profile?.company?.website}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-[100%]">
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Revenue (LTM, $K)</p>
            <p>{formatPrice(profile?.company?.revenue.ltm)}</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Revenue (Previous year, $K) </p>
            <p>{formatPrice(profile?.company?.revenue?.previousYear)}</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Gross Profit(LTM, $K) </p>
            <p>{formatPrice(profile?.company?.grossProfit?.ltm)}</p>
          </div>
          <div className="col-span-2 space-y-2">
            <p className="text-[#808080] ">Gross profit(Previous year, $K) </p>
            <p>{formatPrice(profile?.company?.grossProfit?.previousYear)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">EBIDTA</p>
            <p>{formatPrice(profile?.company?.EBITDA?.ltm)}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">EBIDTA (Previous year, $K) </p>
            <p>{formatPrice(profile?.company?.EBITDA?.previousYear)}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EDFDFF] h-14 flex items-center justify-center px-2 ">
        <div className="w-[85%] flex justify-between items-center">
          <p>Team Credential</p>

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
            <p>{profile?.team?.team1?.fullName}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p>{profile?.team?.team1?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">User 2</p>
            <p>{profile?.team?.team2?.fullName}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Email</p>
            <p>{profile?.team?.team2?.email}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:w-[60%]">
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Username</p>
            <p>{profile?.credentials?.email}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-[#808080] ">Password</p>
            <p>**********</p>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="flex gap-x-2 bg-transparent hover:bg-transparent"
          >
            Log out <GrLogout />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
