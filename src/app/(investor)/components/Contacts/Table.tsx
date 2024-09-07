import { mockedInfo } from "@/lib/data/mockedInfo";
import React from "react";
import { Column } from "./Column";
import { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

const Table = () => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
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
  const handleSetColumnVisibility = (
    newVisibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => {
    setColumnVisibility(newVisibility);
  };
  return (
    <div>
      <DataTable
        columns={Column}
        data={mockedInfo}
        columnVisibility={columnVisibility}
        setColumnVisibility={handleSetColumnVisibility}
      />
    </div>
  );
};

export default Table;
