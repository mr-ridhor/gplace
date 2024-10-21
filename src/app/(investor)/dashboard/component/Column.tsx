import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Button } from "@/components/ui/button";
import { Investor } from "@/lib/data/mocked";
// import { Investors } from "@/lib/data/mocked";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Line, Circle } from "rc-progress";
import { TiArrowUnsorted } from "react-icons/ti";
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
		size: 60,
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
		cell: ({ row }) => (
			<Button
				className={`text-black 
						bg-[#69E7A8] hover:bg-[#69E7A8]/60  rounded-md h-8`}
			>
				{row.original.investmentBio.industry}
			</Button>
		),

		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "dealsIn5Years",
		accessorKey: "investmentBio.dealsIn5Y",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					# of Deals in 5 years
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<p>{formatNumberWithCommas(`${row.original.investmentBio.dealsIn5Y}`)}</p>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "dealsSize",
		accessorKey: "investmentBio.dealsInLTM",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					Typical Deal Size ($M)
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<p>
				{formatNumberWithCommas(`${row.original.investmentBio.dealsInLTM}`)}
			</p>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "primaryContact",
		accessorKey: "primaryContact.name",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
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
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
				>
					Offered Price ($M)
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
		accessorKey: "row.original.status",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-centercursor-pointer w-max flex-row flex gap-x-2 items-center'
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
					className='text-center cursor-pointer w-max flex-row flex gap-x-2 items-center'
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
			<div className='flex items-center'>
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
