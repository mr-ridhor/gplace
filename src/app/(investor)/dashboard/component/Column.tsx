import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Line, Circle } from "rc-progress";
import { TiArrowUnsorted } from "react-icons/ti";
const columnHelper = createColumnHelper();

export const Columns = [
  columnHelper.accessor("name", {
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("country", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("website", {
    // header: "Website",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Website
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => (
      <div
      // href={`https://${info.getValue()}`}
      // target="_blank"
      // rel="noopener noreferrer"
      >
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("investmentIndustry", {
    header: "Investment Industry",
    cell: (info) => (
      <Button
        className={`bg-[#F5E2B7] hover:bg-[#F5E2B7]/60 rounded-md h-8  p-1 badge badge-${info.getValue()}`}
      >
        {info.getValue()}
      </Button>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("investmentGeographies", {
    header: "Investment Geographies",
    cell: (info) => (
      <Button className="badge badge-purple bg-[#E4DAF4] hover:bg-[#E4DAF4]/60 rounded-md h-8">
        {info.getValue()}
      </Button>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("dealsIn5Years", {
    // header: "# of Deals in 5 years",
    header: ({ column }) => {
      return (
        <div
          className="w-[80px]"
          //   variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          # of Deals in 5 years
        </div>
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dealSize", {
    // header: "Deal Size ($M)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Size ($M)
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("primaryContact", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Primary Contract
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => (
      <div className="bg-[#EBEBEB] rounded-md  hover:bg-[#EBEBEB]/60 px-2 py-2 badge badge-gray">
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("match", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Match
          <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
        </Button>
      );
    },
    cell: (info) => (
      <div className="flex items-center">
        <div className="ml-2 rounded-full border bg-[#57D08D]  text-gren-600">
          <CircularProgress percentage={info.getValue()} circleWidth={40} />
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
];
