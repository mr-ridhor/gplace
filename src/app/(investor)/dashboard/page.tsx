"use client";

import React, { useEffect, useState } from "react";
import Table from "./component/Table";
import { fetchInvestors } from "@/lib/actions/investorActions";
import { Investor } from "@/lib/data/mocked";
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent";
import { getPanel } from "@/lib/slice/panelSlice";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const detail = searchParams.get("detail");
  const tab = searchParams.get("tab");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showFilter, showSearch } = useSelector(getPanel);
  // const isDashboard = pathname === "/dashboard";
  // const isDash = pathname === "/dashboard" && detail === "" && tab === "detail";
  useEffect(() => {
    const loadInvestors = async () => {
      try {
        // const data = await fetchInvestors();
        const data = await axios.get(`/api/investors`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(data.data);
        setInvestors(data.data);
      } catch (error) {
        console.error("Failed to fetch investors:", error);
        setError("No investor found");
      } finally {
        setLoading(false);
      }
    };

    loadInvestors();
  }, []);

  if (loading)
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );
  if (error) return <div> {error}</div>;

  return (
    <div className="relative h-[80%] my-4 no-scrollbar overflow-y-auto ">
      {showFilter && (
        <div className="absolute left-0 w-1/4 h-full bg-gray-200 p-4">
          {/* Filter panel content */}
          <p>Filter Panel</p>
        </div>
      )}
      <div
        className={`h-full  ${showFilter ? "ml-[5%]" : ""} ${
          showSearch ? "mr-[25%]" : ""
        }`}
      >
        <Table investors={investors} />
      </div>
      {showSearch && (
        <div className="absolute right-0 w-1/4 h-full bg-blue-200 p-4 top-0 ">
          {/* Search panel content */}
          <p>Search Panel</p>
        </div>
      )}
    </div>
  );
};

export default Page;
