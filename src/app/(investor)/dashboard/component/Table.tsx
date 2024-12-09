// "use client";

// import React, { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { DataTable } from "@/components/ui/data-table";
// import { Column } from "./Column";
// import { Investor } from "@/lib/data/mocked";
// import { VisibilityState } from "@tanstack/react-table";
// import { useDispatch, useSelector } from "react-redux";
// import { getActiveTab, setSelectedRow } from "@/lib/slice/selectedRowSlice";
// import SelectedRow from "../../components/SelectedRow";

// interface Props {
// 	investors: Investor[]; // Investors must be an array
// }

// const Table: React.FC<Props> = ({ investors }) => {
// 	const router = useRouter();
// 	const dispatch = useDispatch();

// 	const handleRowClick = useCallback(
// 		(row: Investor) => {
// 			const id = row._id; // Assuming _id is the unique identifier
// 			localStorage.setItem("selectedRowId", id);
// 			dispatch(setSelectedRow(row.companyInfo.companyName));
// 			router.push(`/dashboard?detail=${id}&tab=detail`);
// 		},
// 		[dispatch, router]
// 	);

// 	const activeTab = useSelector(getActiveTab);
// 	// console.log(investors);
// 	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
// 		name: true,
// 		country: true,
// 		website: true,
// 		investmentIndustry: true,
// 		investmentGeographies: true,
// 		dealsIn5Years: true,
// 		dealSize: true,
// 		primaryContact: true,
// 		status: true,
// 		match: true,
// 		userId: true,
// 	});

// 	const handleSetColumnVisibility = useCallback(
// 		(
// 			newVisibility:
// 				| VisibilityState
// 				| ((old: VisibilityState) => VisibilityState)
// 		) => {
// 			setColumnVisibility(newVisibility);
// 		},
// 		[]
// 	);

// 	return (
// 		<div className='w-full h-full '>
// 			{activeTab === "investors" ? (
// 				<DataTable
// 					columns={Column}
// 					data={investors} // investors prop is an array, safe to pass
// 					// columnVisibility={columnVisibility}
// 					// setColumnVisibility={handleSetColumnVisibility}
// 					onRowClick={handleRowClick}
// 				/>
// 			) : (
// 				<SelectedRow />
// 			)}
// 		</div>
// 	);
// };

// export default Table;
// Table.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { Column } from "./Column";
import { Investor } from "@/lib/data/mocked";
import { VisibilityState } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { setSelectedRow } from "@/lib/slice/selectedRowSlice";

interface Props {
  investors: Investor[]; // Investors must be an array
}

const Table: React.FC<Props> = ({ investors }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const handleRowClick = useCallback(
  //   (row: Investor) => {
  //     const id = row._id; // Assuming _id is the unique identifier
  //     localStorage.setItem("selectedRowId", id);
  //     dispatch(setSelectedRow(row.companyInfo.companyName));
  //     router.push(`/dashboard/${id}`); // Navigate to the dynamic route
  //   },
  //   [dispatch, router]
  // );
  // const handleRowClick = useCallback(
  //   (row: Investor) => {
  //     const tabName = row.companyInfo.companyName;
  //     localStorage.setItem("selectedRowId", row._id);
  //     dispatch(setSelectedRow(tabName));
  //     router.push(`/dashboard/${row._id}`);
  //   },
  //   [dispatch, router]
  // );
  
  const handleRowClick = useCallback(
    (row: Investor) => {
      const tabName = row.companyInfo.companyName;
      localStorage.setItem("selectedRowId", row._id);
  
      // Update Redux state with the selected row
      dispatch(setSelectedRow(tabName));
  
      // Navigate to the tab
      router.push(`/dashboard/${row._id}`);
    },
    [dispatch, router]
  );
 

  return (
    <div className="w-full h-full">
      <DataTable
        columns={Column}
        data={investors}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Table;
