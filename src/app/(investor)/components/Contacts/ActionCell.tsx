// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { IoIosMore } from "react-icons/io";
// import { Row } from "@tanstack/react-table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Investor } from "@/lib/data/mocked";
// // import { fetchInvestors } from "@/lib/actions/investorActions";

// import { useDispatch } from "react-redux";
// // import { setInvestors } from "@/lib/slice/investorSlice";
// import axios from "axios";
// import {
//   fetchInvestorsFailure,
//   fetchInvestorsRequest,
//   fetchInvestorsSuccess,
//   setSearchValue,
//   setSelectedContactTitle,
//   setSelectedCountries,
//   setSelectedDeals,
//   setSelectedDealSize,
//   setSelectedGeography,
//   setSelectedIndustry,
// } from "@/lib/slice/investorSlice";
// // import { loadInvestors } from "@/lib/actions/getInvestors";

// interface Props<TData extends Investor> {
//   row: Row<TData>;
// }

// const ActionCell = <TData extends Investor>({ row }: Props<TData>) => {
//   const [showEditButton, setShowEditButton] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const dispatch = useDispatch();

//   const handleMoreClick = () => {
//     setShowEditButton((prev) => !prev);
//   };

//   const handleDialogClose = (open: boolean) => {
//     setIsDialogOpen(open);
//     if (!open) {
//       setShowEditButton(false);
//     }
//   };

//   const handleDeleteDialogClose = (open: boolean) => {
//     setIsDeleteDialogOpen(open);
//     if (!open) {
//       setShowEditButton(false);
//     }
//   };

//   const loadInvestors = async () => {
//     dispatch(fetchInvestorsRequest());
//     try {
//       const { data } = await axios.get("/api/investors");
//       dispatch(fetchInvestorsSuccess(data));
//     } catch (error) {
//       dispatch(fetchInvestorsFailure("Failed to fetch investors"));
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`api/investors/${row.original._id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         console.log("Investor deleted successfully");
//         // Refetch and reset the investors
//         loadInvestors();
//         // Reset the investors state
//         dispatch(fetchInvestorsRequest());
//         dispatch(fetchInvestorsSuccess([]));
//         // Reset the filters
//         dispatch(setSelectedCountries([]));
//         dispatch(setSelectedDeals(null));
//         dispatch(setSelectedDealSize(null));
//         dispatch(setSelectedIndustry(null));
//         dispatch(setSelectedGeography(null));
//         dispatch(setSelectedContactTitle(null));
//         dispatch(setSearchValue(""));
//       } else {
//         const errorData = await response.json();
//         console.error("Error deleting investor:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error deleting investor:", error);
//     } finally {
//       setIsDeleteDialogOpen(false); // Close the delete dialog after the action
//     }
//   };

//   return (
//     <div className="relative">
//       {/* More icon to toggle Edit button */}
//       <Button
//         variant={"ghost"}
//         className="flex items-center bg-transparent h-20 p-0 hover:bg-transparent"
//         onClick={handleMoreClick}
//       >
//         <IoIosMore />
//       </Button>

//       {showEditButton && (
//         <div className="absolute z-0 bg-white top-12 right-0 h-[45px] w-[100px] shadow-sm rounded-md border ">
//           <div className="h-1/2 flex items-center justify-center">
//             <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
//               <DialogTrigger asChild className="">
//                 <button
//                   type="button"
//                   // variant="ghost"
//                   className=" hover:bg-transparent font-medium  text-[12px]"
//                 >
//                   Edit
//                 </button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px] ">
//                 <DialogHeader>
//                   <DialogTitle>Edit profile</DialogTitle>
//                   <DialogDescription>
//                     Make changes to your profile here. Click save when you're
//                     done.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Name
//                     </Label>
//                     <Input
//                       id="name"
//                       value="Pedro Duarte"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username " className="text-right">
//                       Username
//                     </Label>
//                     <Input
//                       id="username"
//                       value="@peduarte"
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//           <hr />

//           <div className="h-1/2 flex items-center">
//             <Dialog
//               open={isDeleteDialogOpen}
//               onOpenChange={handleDeleteDialogClose}
//             >
//               <DialogTrigger asChild>
//                 <button
//                   type="button"
//                   // variant="ghost"
//                   className="w-full font-medium hover:bg-transparent  text-[12px]"
//                 >
//                   Delete
//                 </button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Confirm Delete</DialogTitle>
//                   <DialogDescription>
//                     Are you sure you want to delete this company? This action
//                     cannot be undone.
//                     {/* {row.original.companyInfo.companyName} */}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsDeleteDialogOpen(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button variant="destructive" onClick={handleDelete}>
//                     Delete
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActionCell;
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
import AddInvestorForm from "../../components/AddInvestorForm";

// export default ActionCell;
interface Props<TData extends Investor> {
  row: Row<TData>;
}

const ActionCell = <TData extends Investor>({ row }: Props<TData>) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditOpen(true);
    setIsMenuOpen(false); // Close the dropdown menu
  };

  const handleOpenDelete = async () => {
    setIsDeleteOpen(true);
    setIsMenuOpen(false); // Close the dropdown menu
  };
  const loadInvestors = async () => {
    dispatch(fetchInvestorsRequest());
    try {
      const { data } = await axios.get("/api/investors");
      dispatch(fetchInvestorsSuccess(data));
    } catch (error: any) {
      dispatch(fetchInvestorsFailure(error.response.data.message));
      // toast()
    }
  };
  const handleDelete = async () => {
    setIsDeleteOpen(true);
    setIsDeleting(true);
    try {
      const response = await fetch(`api/investors/${row.original._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsDeleting(false);
      toast("Investor deleted successfully", {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
      if (response.ok) {
        // Refetch and reset the investors
        loadInvestors();
        // Reset the investors state
        dispatch(fetchInvestorsRequest());
        dispatch(fetchInvestorsSuccess([]));
        // Reset the filters
        dispatch(setSelectedCountries([]));
        dispatch(setSelectedDeals(null));
        dispatch(setSelectedDealSize(null));
        dispatch(setSelectedIndustry(null));
        dispatch(setSelectedGeography(null));
        dispatch(setSelectedContactTitle(null));
        dispatch(setSearchValue(""));
      } else {
        const errorData = await response.json();
        console.error("Error deleting investor:", errorData.message);
        toast(errorData.message, {
          description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
        });
      }
    } catch (error: any) {
      console.error("Error deleting investor:", error);
      toast(error.response.data.message, {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
    } finally {
      setIsMenuOpen(false); // Close the dropdown menu
      setIsDeleting(false);
      // setIsDeleteDialogOpen(false); // Close the delete dialog after the action
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

export default ActionCell;
