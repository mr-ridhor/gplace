import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Button } from "@/components/ui/button";
import { Investor } from "@/lib/data/mocked";
// import { Investors } from "@/lib/data/mocked";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Line, Circle } from "rc-progress";
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";
import ActionCell from "./ActionCell";
import { formatNumberWithCommas } from "@/lib/numeralFormatter";
const columnHelper = createColumnHelper();

export const Column: ColumnDef<Investor>[] = [
	{
		id: "name",
		accessorKey: "companyInfo.companyName",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='cursor-pointer text-left w-max flex-row flex gap-x-2 items-center'
				>
					Name
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => (
			<p className='capitalize'>{row.original.companyInfo.companyName}</p>
		),
		enableSorting: true,
		enableHiding: false,
		// size: 60,
	},
	{
		id: "country",
		accessorKey: "companyInfo.country",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-left cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					Country
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => <p className=''>{row.original.companyInfo.country}</p>,
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "website",
		accessorKey: "companyInfo.website",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-left cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					Website
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => row.original.companyInfo.website,
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "investmentIndustry",
		accessorKey: "investmentBio.industry",
		// header: "Investment Industry",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					Investment Industry
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => {
			const industries = row.original.investmentBio.industry;
			
			// Function to chunk the industries array into groups of 3
			const chunkedIndustries = (arr: string[], size: number): string[][] => { 
				const result: string[][] = [];
				for (let i = 0; i < arr.length; i += size) {
				  result.push(arr.slice(i, i + size));
				}
				return result;
			  };
			  
			  const groupedIndustries = chunkedIndustries(
				industries.flatMap((item: string) =>
				  item.includes(",") 
					? item.split(",").map((industry: string) => industry.trim()) 
					: [item]
				),
				3
			  );
			  
		
			return (
				<div>
					{groupedIndustries.length > 0 ? (
						groupedIndustries.map((group, groupIndex) => (
							<div key={groupIndex} className="flex gap-2 mb-2">
								{group.map((industry, index) => (
									<div key={index} className="flex-shrink-0 w-auto">
										<Button className="text-black bg-[#69E7A8] hover:bg-[#69E7A8]/60 rounded-md h-8 px-4">
											{industry}
										</Button>
									</div>
								))}
							</div>
						))
					) : (
						<div className="flex justify-center">
							<Button className="text-black bg-[#69E7A8] hover:bg-[#69E7A8]/60 rounded-md h-8 px-4 w-auto">
								No Industry Listed
							</Button>
						</div>
					)}
				</div>
			);
		},							

		enableSorting: true,
		enableHiding: false,
	},

	{
		id: "dealsSize",
		accessorKey: "investmentBio.dealsInLTM",
		header: ({ column, table }) => {
		  const isSorted = column.getIsSorted(); // null, "asc", or "desc"
	  
		  return (
			<div
			  onClick={() => {
				if (!isSorted) {
				  column.toggleSorting(); // Toggles to ascending
				} else if (isSorted === "asc") {
				  column.toggleSorting(); // Toggles to descending
				} else {
				  table.resetSorting(); // Resets to unsorted
				}
			  }}
			  className="w-max text-center cursor-pointer justify-center flex-row flex gap-x-2 items-center"
			>
			  Typical Price Paid ($K)
			  <TiArrowUnsorted className="h-4 w-4 text-[#898989]" />
			</div>
		  );
		},
		cell: ({ row }) => (
		  <div className="w-max flex flex-row gap-x-1 items-center justify-center">
			<p>{formatNumberWithCommas(`${row.original.paidInfo.valuation.from}`)}</p>
			-
			<p>{formatNumberWithCommas(`${row.original.paidInfo.valuation.to}`)}</p>
		  </div>
		),
		enableSorting: true,
		enableHiding: false,
		sortingFn: (rowA, rowB) => {
			const a = rowA.original.paidInfo.valuation;
			const b = rowB.original.paidInfo.valuation;
		  
			// Convert string to number for arithmetic operations
			if (Number(a.to) !== Number(b.to)) return Number(a.to) - Number(b.to);
		  
			if (Number(a.from) !== Number(b.from)) return Number(a.from) - Number(b.from);
		  
			// Default: equal
			return 0;
		  },
		  
	  }
	  
,	
	{
		id: "primaryContact",
		accessorKey: "primaryContact.name",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer justify-center w-max  flex-row flex gap-x-2 items-center'
				>
					Primary Contact
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<p className='capitalize'>{row.original.primaryContact.name}</p>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "offeredPrice",
		accessorKey: "offeredPrice.valuation",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer  justify-center w-max  flex-row flex gap-x-2 items-center'
				>
					Offered Price ($K)
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<p>{formatNumberWithCommas(`${row.original.offeredPrice.valuation}`)}</p>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "status",
		accessorKey: "status",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer justify-center w-max  flex-row flex gap-x-2 items-center'
				>
					Status
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			// <div className='bg-[#EBEBEB] text-center rounded-md w-[120px] hover:bg-[#EBEBEB]/60 px-2 py-2 badge badge-gray'>

			<div className='bg-[#EBEBEB] text-left rounded-md  hover:bg-[#EBEBEB]/60 px-2 py-2 badge badge-gray'>
				{row.original.status ? row.original.status : "Data Exchange"}
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "match",
		accessorKey: "matchScore.totalScore",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer justify-center w-max 2xl:w-full flex-row flex gap-x-2 items-center'
				>
					Match
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className='flex justify-center items-center'>
				<div className=' rounded-full border bg-[#57D08D]  text-gren-600'>
					<CircularProgress
						// percentage={10}
						percentage={row.original.matchScore.totalScore}
						circleWidth={40}
					/>
				</div>
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			console.log(row.original);

			return (
				<div className='' onClick={(e) => e.stopPropagation()}>
					<ActionCell row={row} />
				</div>
			);
		},
	},
];
