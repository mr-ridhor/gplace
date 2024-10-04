import React from "react";
import { useRouter } from "next/router"; // Use useRouter for Next.js routing
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi";
import { Selects } from "../Selects";
import { Label } from "@radix-ui/react-label";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibility?: VisibilityState;
  setColumnVisibility?: (
    visibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => void;
  headerBgColor?: string;
  onRowClick?: (row: TData) => void; // Add prop for row click handler
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibility,
  setColumnVisibility,
  headerBgColor = "bg-[#F5F8FA]",
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5); // Default to a smaller page size for better UX

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      setPageIndex((old) => {
        const newPageIndex =
          typeof updater === "function"
            ? updater({ pageIndex: old, pageSize }).pageIndex
            : updater.pageIndex;
        return newPageIndex !== undefined ? newPageIndex : old;
      });

      setPageSize((old) => {
        const newPageSize =
          typeof updater === "function"
            ? updater({ pageIndex, pageSize: old }).pageSize
            : updater.pageSize;
        return newPageSize !== undefined ? newPageSize : old;
      });
    },
  });

  const options = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "3", label: "50" },
    { value: "100", label: "100 " },
  ];

  return (
    <div className="rounded-md border w-full h-full">
      <div className="w-full h-[90%] overflow-auto no-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`${headerBgColor} text-[#898989]`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${index < 3 ? "text-left" : "text-center"}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-[#898989] px-2 w-full ">
        <div className="flex items-center gap-x-2 ">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <BiSolidLeftArrowAlt className="h-6 w-6" />
          </Button>
          <p>
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </p>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() =>
              setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1))
            }
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <BiSolidRightArrowAlt className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center gap-x-2  w-max  justify-end">
          <Label>Rows per page</Label>
          <Selects
            className="border flex rounded p w-[60px] focus:ring-0 ring-0"
            options={options}
            placeholder="Select rows"
            value={String(pageSize)} // Pass the current pageSize as a string
            onChange={(value) => setPageSize(Number(value))} // Update pageSize when the selection changes
          />
        </div>
      </div>
    </div>
  );
}
