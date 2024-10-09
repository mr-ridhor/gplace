"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Investor } from "@/lib/data/mocked";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
// import { setInvestors } from "@/lib/slice/investorSlice";
import axios from "axios";
import {
  fetchInvestorsFailure,
  fetchInvestorsRequest,
  fetchInvestorsSuccess,
  setSearchValue,
  setSelectedContactTitle,
  setSelectedCountries,
  setSelectedDeals,
  setSelectedDealSize,
  setSelectedGeography,
  setSelectedIndustry,
} from "@/lib/slice/investorSlice";
import { toast } from "sonner";
import moment from "moment";
import { LuLoader } from "react-icons/lu";
import AddInvestorForm from "../AddInvestorForm";
import { mockedInfoType } from "@/lib/data/mockedInfo";

// export default ActionCell;
interface Props<TData extends mockedInfoType> {
  row: Row<TData>;
}

const ContactActionCell = <TData extends mockedInfoType>({
  row,
}: Props<TData>) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditOpen(true);
    setIsMenuOpen(false);
  };

  const handleOpenDelete = async () => {
    setIsDeleteOpen(true);
    setIsMenuOpen(false);
  };
  // const loadInvestors = async () => {
  //   dispatch(fetchInvestorsRequest());
  //   try {
  //     // const { data } = await axios.get(`/api/investors/${row.original._id}`);
  //     const { data } = await axios.get(
  //       `/api/investors/${row.original._id}/contact`
  //     );

  //     dispatch(fetchInvestorsSuccess(data));
  //   } catch (error: any) {
  //     dispatch(fetchInvestorsFailure(error.response.data.message));
  //     // toast()
  //   }
  // };
  const handleDelete = async () => {
    setIsDeleteOpen(true);
    setIsDeleting(true);
    try {
      const response = await fetch(
        `api/investors/${row.original.investor}/contact`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsDeleting(false);
      console.log(response);
      // toast("Investor deleted successfully", {
      //   description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      // });
    } catch (error: any) {
      console.error("Error deleting investor:", error);
      // toast(error.data.message, {
      //   description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      // });
    }
  };
  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem className=" cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            onClick={handleOpenDelete}
            className=" cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      {/* <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Investor</DialogTitle>
            <DialogDescription>
              Make changes to the investor details below:
            </DialogDescription>
          </DialogHeader>
         
          <DialogFooter>
            <Button variant={"outline"} onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="text-white"
              onClick={() => {
        
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Investor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this investor?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"outline"}
              className="border"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {isDeleting ? (
                <>
                  <LuLoader className="text-white h-4 w-4 animate-spin" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactActionCell;
