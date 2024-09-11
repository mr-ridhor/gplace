import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Button } from "@/components/ui/button";
import { Investor } from "@/lib/data/mocked";
// import { Investors } from "@/lib/data/mocked";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Line, Circle } from "rc-progress";
import { TiArrowUnsorted } from "react-icons/ti";
const columnHelper = createColumnHelper();

export const Column: ColumnDef<Investor>[] = [
  // {
  //   id: "userId",
  //   // accessorKey: "Name",
  //   // header: ({ column }) => {
  //   //   const isSorted = column.getIsSorted();
  //   //   return (
  //   //     <Button
  //   //       variant="ghost"
  //   //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //   //     >
  //   //       Name
  //   //       <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
  //   //     </Button>
  //   //   );
  //   // },
  //   cell: ({ row }) => row.original.user,
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    id: "name",
    accessorKey: "Name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.companyInfo.companyName,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "country",
    accessorKey: "Country",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.companyInfo.country,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "website",
    accessorKey: "Website",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.companyInfo.website,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "investmentIndustry",
    accessorKey: "Investment Industry",
    header: "Investment Industry",
    cell: ({ row }) => (
      <Button className="badge badge-purple bg-[#E4DAF4] hover:bg-[#E4DAF4]/60 rounded-md h-8">
        {row.original.investmentBio.industry}
      </Button>
    ),

    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "dealsIn5Years",
    accessorKey: "# of Deals in 5 years",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.investmentBio.dealsIn5Y,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "dealsSize",
    accessorKey: "Deal Size ($M)",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.investmentBio.dealsInLTM,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "primaryContact",
    accessorKey: "Primary Contact",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => row.original.primaryContact.phone,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "status",
    accessorKey: "Status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => (
      <div className="bg-[#EBEBEB] rounded-md  hover:bg-[#EBEBEB]/60 px-2 py-2 badge badge-gray">
        {row.original.status ? row.original.status : "Data Exchange"}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "match",
    accessorKey: "Match",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
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
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="ml-2 rounded-full border bg-[#57D08D]  text-gren-600">
          <CircularProgress
            percentage={row.original.matchScore.totalScore}
            circleWidth={40}
          />
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
];
