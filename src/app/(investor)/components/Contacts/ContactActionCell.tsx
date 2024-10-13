"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { LuLoader } from "react-icons/lu";
import { mockedInfoType } from "@/lib/data/mockedInfo";
import { deleteContact } from "@/lib/actions/getContact";
import { useDispatch } from "react-redux";
import { deleteContactData } from "@/lib/slice/contactSlice";
import axios from "axios";
import EditContact from "./EditConract";

interface Props<TData extends mockedInfoType> {
	row: Row<TData>;
}

const ContactActionCell = <TData extends mockedInfoType>({
	row,
}: Props<TData>) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false); // For Edit Dialog
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isSaving, setIsSaving] = useState(false); // For Edit Saving state
	const [editContactType, setEditContactType] = useState(
		row.original.contactType
	); // Edit contactType
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();

	const handleOpenDelete = () => {
		setIsDeleteOpen(true);
		setIsMenuOpen(false);
	};

	const handleOpenEdit = () => {
		setIsEditOpen(true);
		setIsMenuOpen(false);
	};

	const handleDelete = async () => {
		setIsDeleting(true);

		const result = await deleteContact(row.original.investor, row.original._id);

		setIsDeleting(false);
		setIsDeleteOpen(false);
		dispatch(deleteContactData(row.original._id));
		if (result.success) {
			toast({
				title: result.message,
				description: result.timestamp,
			});
		} else {
			toast({
				title: result.message,
			});
		}
	};

	const handleSaveEdit = async () => {
		setIsSaving(true);

		// Assuming you're updating the contactType field
		try {
			const response = await axios.put("/update-contact", {
				id: row.original._id,
				contactType: editContactType, // Send the updated contactType
			});
			toast({
				title: "Contact updated",
				description: "The contact type has been updated successfully.",
			});
			setIsEditOpen(false);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update the contact type.",
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<>
			<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
					>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={handleOpenEdit} className='cursor-pointer'>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={handleOpenDelete}
						className='cursor-pointer'
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

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
							className='border'
							onClick={() => setIsDeleteOpen(false)}
						>
							Cancel
						</Button>
						<Button variant='destructive' onClick={handleDelete}>
							{isDeleting ? (
								<LuLoader className='text-white h-4 w-4 animate-spin' />
							) : (
								"Delete"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Contact</DialogTitle>
						<DialogDescription>
							Update the contact type below.
						</DialogDescription>
					</DialogHeader>
					<EditContact onClose={() => setIsEditOpen(false)} />
					{/* <div className='space-y-4'>
						<label htmlFor='contactType'>Contact Type:</label>
						<select
							id='contactType'
							value={editContactType}
							onChange={(e) => setEditContactType(e.target.value)}
							className='w-full p-2 border rounded-md'
						>
							<option value='primary'>Primary</option>
							<option value='secondary'>Secondary</option>
						</select>
					</div>
					<DialogFooter>
						<Button variant={"outline"} onClick={() => setIsEditOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveEdit}>
							{isSaving ? (
								<LuLoader className='text-white h-4 w-4 animate-spin' />
							) : (
								"Save"
							)}
						</Button>
					</DialogFooter> */}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ContactActionCell;

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Investor } from "@/lib/data/mocked";
// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useRouter, useSearchParams } from "next/navigation"; // Import the useRouter hook
// // import { deleteInvestor } from "@/app/actions/deleteInvestor"; // Adjust the path as needed
// import { toast } from "@/components/ui/use-toast"; // Ensure toast is properly imported
// import { LuLoader } from "react-icons/lu";
// import { mockedInfoType } from "@/lib/data/mockedInfo";
// import { deleteContact } from "@/lib/actions/getContact";
// import { useDispatch } from "react-redux";
// import { deleteContactData } from "@/lib/slice/contactSlice";

// interface Props<TData extends mockedInfoType> {
//   row: Row<TData>;
// }

// const ContactActionCell = <TData extends mockedInfoType>({
//   row,
// }: Props<TData>) => {
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const router = useRouter(); // Initialize the router
//   const searchParams = useSearchParams();
//   const dispatch = useDispatch();
//   const handleOpenDelete = () => {
//     setIsDeleteOpen(true);
//     setIsMenuOpen(false);
//   };

//   const handleDelete = async () => {
//     setIsDeleting(true);

//     const result = await deleteContact(row.original.investor, row.original._id);

//     setIsDeleting(false);
//     setIsDeleteOpen(false); // Close the dialog after deletion
//     dispatch(deleteContactData(row.original._id));
//     if (result.success) {
//       toast({
//         title: result.message,
//         description: result.timestamp,
//       });
//     } else {
//       toast({
//         title: result.message,
//       });
//     }
//   };

//   return (
//     <>
//       <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//           >
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end">
//           <DropdownMenuItem
//             // onClick={handleOpenDelete}
//             className="cursor-pointer"
//           >
//             Edit
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={handleOpenDelete}
//             className="cursor-pointer"
//           >
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Investor</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this investor?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant={"outline"}
//               className="border"
//               onClick={() => setIsDeleteOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               {isDeleting ? (
//                 <LuLoader className="text-white h-4 w-4 animate-spin" />
//               ) : (
//                 "Delete"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ContactActionCell;
