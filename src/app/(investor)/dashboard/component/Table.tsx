"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { Columns } from "./Column";
import { mockedsData } from "@/lib/data/mocked";
import { VisibilityState } from "@tanstack/react-table"; // Import VisibilityState type

const Table = () => {
  // State to manage column visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    name: true,
    country: true,
    website: true,
    investmentIndustry: true,
    investmentGeographies: true,
    dealsIn5Years: true,
    dealSize: true,
    primaryContact: true,
    status: true,
    match: true,
  });

  // Handler to update column visibility
  const handleSetColumnVisibility = (
    newVisibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => {
    setColumnVisibility(newVisibility);
  };

  return (
    <DataTable
      columns={Columns}
      data={mockedsData}
      columnVisibility={columnVisibility}
      setColumnVisibility={handleSetColumnVisibility}
    />
  );
};

export default Table;
