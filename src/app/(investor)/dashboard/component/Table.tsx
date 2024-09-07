// "use client";
// import { DataTable } from "@/components/ui/data-table";
// import React, { useState } from "react";
// import { Columns } from "./Column";
// import { mockedsData } from "@/lib/data/mocked";
// import { VisibilityState } from "@tanstack/react-table"; // Import VisibilityState type

// const Table = () => {
//   // State to manage column visibility
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
//     name: true,
//     country: true,
//     website: true,
//     investmentIndustry: true,
//     investmentGeographies: true,
//     dealsIn5Years: true,
//     dealSize: true,
//     primaryContact: true,
//     status: true,
//     match: true,
//   });

//   // Handler to update column visibility
//   const handleSetColumnVisibility = (
//     newVisibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
//   ) => {
//     setColumnVisibility(newVisibility);
//   };

//   return (
//     <DataTable
//       columns={Columns}
//       data={mockedsData}
//       columnVisibility={columnVisibility}
//       setColumnVisibility={handleSetColumnVisibility}
//     />
//   );
// };

// export default Table;

"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { DataTable } from "@/components/ui/data-table";
import { Columns } from "./Column";
import { mockedsData } from "@/lib/data/mocked";
import { VisibilityState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTab, setSelectedRow } from "@/lib/slice/selectedRowSlice";
import SelectedRow from "../../components/SelectedRow";

const Table = () => {
  const router = useRouter(); // Initialize useRouter hook

  // Handler for row click
  // const handleRowClick = (row: any) => {
  //   const id = row.id; // Replace with the appropriate identifier from your data
  //   router.push(`/details/${id}`); // Navigate to dynamic route
  // };
  const dispatch = useDispatch(); // Get dispatch function

  // Handler for row click
  // const handleRowClick = (row: any) => {
  //   dispatch(setSelectedRow(row)); // Set the selected row globally
  // };
  // const handleRowClick = (row: any) => {
  //   const id = row.id;
  //   dispatch(setSelectedRow(row.name)); // Set the selected row in Redux
  //   // router.push(`/details/${id}`); // Navigate to the dynamic route
  // };
  const handleRowClick = (row: any) => {
    const id = row.id; // Replace with the appropriate identifier from your data
    dispatch(setSelectedRow(row.name)); // Set the selected row in Redux
    router.push(`/dashboard?detail=${row.name}&tab=detail`); // Navigate to the dynamic route
  };
  const activeTab = useSelector(getActiveTab);
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
    // <DataTable
    //   columns={Columns}
    //   data={mockedsData}
    //   columnVisibility={columnVisibility}
    //   setColumnVisibility={handleSetColumnVisibility}
    //   onRowClick={handleRowClick} // Pass the handler to DataTable
    // />
    <>
      {activeTab === "investors" ? (
        <DataTable
          columns={Columns}
          data={mockedsData}
          columnVisibility={columnVisibility}
          setColumnVisibility={handleSetColumnVisibility}
          onRowClick={handleRowClick} // Pass the handler to DataTable
        />
      ) : (
        // If the active tab is not 'investors', render SelectedRowComponent
        <SelectedRow />
      )}
    </>
  );
};

export default Table;
