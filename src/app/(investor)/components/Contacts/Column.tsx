import { Button } from "@/components/ui/button";
import { mockedInfoType } from "@/lib/data/mockedInfo";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { TiArrowUnsorted } from "react-icons/ti";

const columnHelper = createColumnHelper<mockedInfoType>();

export const Column = [
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: (info) => (
      <div className="text-[10px] md:text-sm">{info.getValue()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: (info) => (
      <div className="text-[10px] md:text-sm">{info.getValue()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: (info) => (
      <div className="text-[10px] md:text-sm">{info.getValue()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("phone", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: (info) => (
      <div className="text-[10px] md:text-sm">{info.getValue()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("contactType", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact Type
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: (info) => (
      <Button
        className={`bg-[#FCF0FD] hover:bg-[#FCF0FD]/90 text-[10px] md:text-sm rounded-md h-8 px-2`}
      >
        {info.getValue()}
        {/* <p>Secondary</p> */}
      </Button>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
];
