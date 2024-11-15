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
			// console.log(industries.length);
			return (
				<div className='flex gap-1'>
					{industries.length > 0 ? (
						industries.flatMap((item) =>
							item.includes(",") ? (
								item.split(",").map((industry, index) => (
									<div className='w-max' key={index}>
										<Button className='text-black bg-[#69E7A8] hover:bg-[#69E7A8]/60 rounded-md h-8'>
											{industry.trim()}
										</Button>
									</div>
								))
							) : (
								<div className='w-max' key={item}>
									<Button className='text-black bg-[#69E7A8] hover:bg-[#69E7A8]/60 rounded-md h-8'>
										{item}
									</Button>
								</div>
							)
						)
					) : (
						<div className='w-max'>
							<Button className='text-black bg-[#69E7A8] hover:bg-[#69E7A8]/60 rounded-md h-8'>
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
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='text-center cursor-pointer justify-center w-max 2xl:w-full flex-row flex gap-x-2 items-center'
				>
					Typical Price Paid ($ 000)
					<TiArrowUnsorted
						className=' h-4 w-4 text-[#898989]'
						// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className='flex flex-row  gap-x-1 items-center w-full justify-center'>
				<p>
					{formatNumberWithCommas(`${row.original.paidInfo.valuation.from}`)}
				</p>
				-
				<p>{formatNumberWithCommas(`${row.original.paidInfo.valuation.to}`)}</p>
			</div>
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
					className='text-center cursor-pointer justify-center w-max 2xl:w-full flex-row flex gap-x-2 items-center'
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
					className='text-center cursor-pointer  justify-center w-max 2xl:w-full flex-row flex gap-x-2 items-center'
				>
					Offered Price ($ 000)
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
					className='text-center cursor-pointer justify-center w-max 2xl:w-full flex-row flex gap-x-2 items-center'
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
