import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Button } from "@/components/ui/button";
import { Investor } from "@/lib/data/mocked";
// import { Investors } from "@/lib/data/mocked";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Line, Circle } from "rc-progress";
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";

import { formatNumberWithCommas } from "@/lib/numeralFormatter";
import { Payment } from "@/lib/data/payment";
import moment from "moment";
const columnHelper = createColumnHelper();

export const Column: ColumnDef<Payment>[] = [
	{
		id: "plan_type",
		accessorKey: "plan type",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='cursor-pointer text-left w-max flex-row flex gap-x-2 items-center'
				>
					Type of Plan
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => (
			<p className='capitalize'>{row.original.plan_type}</p>
		),
		enableSorting: true,
		enableHiding: false,
		// size: 60,
	},
	{id: "card",
		accessorKey: "card",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='cursor-pointer text-left w-max flex-row flex gap-x-2 items-center'
				>
					Credit Card Number
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => (
			<p className='capitalize'>{row.original.card_number}</p>
		),
		enableSorting: true,
		enableHiding: false,
		// size: 60,
	},
	{id: "amount",
		accessorKey: "amount",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='cursor-pointer text-left w-max flex-row flex gap-x-2 items-center'
				>
					Amount($)
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => (
			<p className='capitalize'>{row.original.amount}</p>
		),
		enableSorting: true,
		enableHiding: false,
		// size: 60,
	},
    {id: "date",
		accessorKey: "date",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='cursor-pointer text-left w-max flex-row flex gap-x-2 items-center'
				>
					Date
					<TiArrowUnsorted className=' h-4 w-4 text-[#898989]' />
				</div>
			);
		},
		cell: ({ row }) => (
            <div className="w-max">

			<p className='capitalize'>{moment(row.original.date).format("DD/MM/YY")}</p>
            </div>
		),
		enableSorting: true,
		enableHiding: false,
		// size: 60,
	},
];
