// "use client";

// import {
//   ColumnDef,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "./button";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   headerBgColor?: string;
//   columnVisibility?: VisibilityState;
//   setColumnVisibility?: (
//     visibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
//   ) => void;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   columnVisibility,
//   setColumnVisibility,
//   headerBgColor = "bg-white",
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       columnVisibility,
//     },
//   });

//   return (
//     <div className="">
//       <div className="rounded-md border ">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={crypto.randomUUID()}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead
//                       key={crypto.randomUUID()}
//                       className={`${headerBgColor} text-yellow-600`}
//                     >
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={crypto.randomUUID()}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={crypto.randomUUID()}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibility?: VisibilityState;
  setColumnVisibility?: (
    visibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
  ) => void;
  headerBgColor?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibility,
  setColumnVisibility,
  headerBgColor = "bg-[#F5F8FA]",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={crypto.randomUUID()}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={crypto.randomUUID()}
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
                  key={crypto.randomUUID()}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={crypto.randomUUID()}>
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
      {/* 
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </>
  );
}
