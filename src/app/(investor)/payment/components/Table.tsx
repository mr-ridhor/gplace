"use client";

import React, { useState, useCallback } from "react";

import { DataTable } from "@/components/ui/data-table";
import { Investor } from "@/lib/data/mocked";
import { VisibilityState } from "@tanstack/react-table";

import { payments } from "@/lib/data/payment";
import { Column } from "./PaymentColumn";

interface Props {
  investors: Investor[]; // Investors must be an array
}

const Table: React.FC<Props> = ({ investors }) => {
 


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
    userId: true,
  });

  return (
    <div className="w-full h-full">
      <DataTable
        columns={Column}
        data={payments}
    
      />
    </div>
  );
};

export default Table;