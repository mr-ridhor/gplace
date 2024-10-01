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
  const [pageSize, setPageSize] = React.useState(1);

  const table = useReactTable({
    data: data,
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

  return (
    <div className="rounded-md boder w-full h-full 2xl:py-6">
      {/* <Table className={`w-${table.getTotalSize()}`}> */}
      <div className="w-full h-[90%]">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={crypto.randomUUID()}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={crypto.randomUUID()}
                    className={`${headerBgColor} w-${header.getSize()} text-[#898989]`}
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
          <TableBody className="h-max">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  key={crypto.randomUUID()}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)} // Trigger row click handler
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={crypto.randomUUID()}
                      className={`w-${cell.column.getSize()} ${
                        index < 3 ? "text-left" : "text-center"
                      } bg-re-300`}
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

          {/* <TableFooter className="h-[10%] bg-green-600">
          <TableRow>
            <TableCell colSpan={columns.length} className="w-full"> */}

          {/* </TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </div>
      <div className="h-[10%] flex justify-between items-center text-[#898989] py-2">
        <div className="flex gap-x-1 items-center">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            <BiSolidLeftArrowAlt className="h-6 w-6" />
          </Button>
          <p>Previous</p>
        </div>
        <div className="flex items-center space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              variant="outline"
              className={`h-8 w-8 p-0 ${pageIndex === i ? "bg-gray-200" : ""}`}
              onClick={() => setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-x-1">
          <p>Next</p>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiSolidRightArrowAlt className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
