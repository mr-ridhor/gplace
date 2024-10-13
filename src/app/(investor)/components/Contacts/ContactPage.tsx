"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ContactHeader from "./ContactHeader";
import { BiLogoTelegram } from "react-icons/bi";
import Table from "./Table";
import { Investor } from "@/lib/data/mocked";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddContact from "./AddContact"; // Adjust import based on your filename
import EditContact from "./EditConract";

interface Props {
	selectedItem: Investor;
}

const ContactPage: React.FC<Props> = ({ selectedItem }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className='w-full space-y-3 my-2 h-full'>
			<ContactHeader selectedItem={selectedItem} />
			<div
				className='border rounded-md w-full text-[10px] md:text-sm p-3 space-y-4 shadow shadow-gray-200'
				draggable
			>
				<div className='flex-col md:flex-row items-center gap-x-3 flex justify-between w-full'>
					<div className='flex gap-x-2 h-fit items-center'>
						<p className='capitalize'>
							{selectedItem?.primaryContact.name}{" "}
							{selectedItem?.primaryContact.surname}
						</p>
					</div>
					<div className='flex-1 flex justify-between w-full'>
						<div className='w-fit h-8 px-2 items-center flex bg-[#FCF0FD] rounded-md '>
							<p>Primary Contact</p>
						</div>
						<div className='text-black h-8'>
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<DialogTrigger asChild>
									<Button
										className='h-full items-center flex gap-x-1 bg-[#DCF8FC] hover:bg-[#DCF8FC]/60 text-[10px] md:text-sm'
										onClick={() => setIsDialogOpen(true)} // Open dialog
									>
										View record <BiLogoTelegram />
									</Button>
								</DialogTrigger>
								<EditContact
									selectedItem={selectedItem}
									onClose={handleCloseDialog}
								/>
							</Dialog>
						</div>
					</div>
				</div>
				<div className='w-full grid-cols-2 gap-y-2 md:grid-cols-3 grid gap-x-2 '>
					<div className='col-span-1 space-y-1'>
						<p>Title</p>
						<p>{selectedItem?.primaryContact.title}</p>
					</div>
					<div className='col-span-1 space-y-1'>
						<p>Phone</p>
						<p>{selectedItem?.primaryContact.phone}</p>
					</div>
					<div className='col-span-1 space-y-1'>
						<p>Email</p>
						<p>{selectedItem?.primaryContact.email}</p>
					</div>
				</div>
			</div>
			<div className='flex-1 overflow-y-auto no-scrollbar'>
				<Table id={selectedItem._id} />
			</div>
		</div>
	);
};

export default ContactPage;
