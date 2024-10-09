import { Button } from "@/components/ui/button";
import { mockedInfoType } from "@/lib/data/mockedInfo"; // Ensure this type is correct
import { ColumnDef } from "@tanstack/react-table";
import { TiArrowUnsorted } from "react-icons/ti";
import ContactActionCell from "./ContactActionCell";
// import ActionCell from "./ActionCell";

// Create a new type that includes the actions
type TableRowType = mockedInfoType & { actions?: any }; // Adjust the type as necessary

export const Column: ColumnDef<TableRowType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[10px] md:text-sm">{row.original.name}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[10px] md:text-sm">{row.original.title}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[10px] md:text-sm">{row.original.email}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[10px] md:text-sm">{row.original.phone}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "contactType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact Type
        <TiArrowUnsorted className="ml-2 h-4 w-4 text-[#898989]" />
      </Button>
    ),
    cell: ({ row }) => (
      <Button
        className={`bg-[#FCF0FD] hover:bg-[#FCF0FD]/90 text-[10px] md:text-sm rounded-md h-8 px-2`}
      >
        {row.original.contactType}
        {/* <p>Secondary</p> */}
      </Button>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions", // Make sure to give a unique id for the actions column
    cell: ({ row }) => {
      console.log("here", row.original);
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <ContactActionCell row={row} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
];
