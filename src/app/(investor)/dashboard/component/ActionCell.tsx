import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface Props<TData> {
  row: Row<TData>;
}

const ActionCell = <TData,>({ row }: Props<TData>) => {
  // Declare onEdit and onDelete inside the component
  const onEdit = (rowData: TData) => {
    console.log("Editing row:", rowData);
    // Add your edit logic here
  };

  const onDelete = (rowData: TData) => {
    console.log("Deleting row:", rowData);
    // Add your delete logic here
  };

  return (
    <div className="mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="flex h-6 w-6 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row.original)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionCell;
