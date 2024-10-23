"use Client";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contSchema } from "@/lib/zod-schema/contSchema";
import { contType } from "@/lib/zod-type/contType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Investor } from "@/lib/data/mocked";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LuLoader } from "react-icons/lu";
import moment from "moment";
import { toast } from "sonner";

interface Props {
	selectedItem?: Investor;
	onClose: () => void;
	onUpdate: () => void;
}
const ViewContact: React.FC<Props> = ({ selectedItem, onClose, onUpdate }) => {
	const router = useRouter();
	const [contactType, setContactType] = useState("Primary");
	const [info, setInfo] = useState({
		name: selectedItem?.primaryContact.name,
		surname: selectedItem?.primaryContact.surname,
		email: selectedItem?.primaryContact.email,
		phone: selectedItem?.primaryContact.phone,
		title: selectedItem?.primaryContact.title,
		// contactType:selectedItem?.primaryContact.
	});
	console.log(selectedItem);
	const form = useForm<contType>({
		resolver: zodResolver(contSchema),
		mode: "onChange",
		defaultValues: {
			name: info.name,
			surname: info.surname,
			email: info.email,
			phone: info.phone,
			title: info.title,
			// contactType: "Primary",
		},
	});

	const onSubmit = async (data: contType) => {
		const payload = {
			name: data.name,
			surname: data.surname,
			email: data.email,
			phone: data.phone,
			title: data.title,
			// contactType: contactType,
		};
		console.log(payload);
		try {
			const investorId = selectedItem?._id;

			if (!investorId) {
				throw new Error("Investor ID is missing");
			}
			const payload = {
				name: data.name,
				surname: data.surname,
				email: data.email,
				phone: data.phone,
				title: data.title,
				// contactType: contactType,
			};
			// Use axios directly to post data
			await axios.put(`/api/investors/${investorId}`, {
				primaryContact: payload,
			});
			onUpdate();
			// Refresh the data or reload the page
			// router.refresh();
			console.log("Contact added successfully"); // Handle success message
			toast("Contact added successfully", {
				description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
			});
			// window.location.reload();
		} catch (error: any) {
			console.error(error);
			toast("All fields must be filled", {
				description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
			});
		}
	};

	return (
		<DialogContent className='max-h-[550px] text-sm  w-[320px] md:w-[600px] my-3 overflow-auto no-scrollbar'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<div className='w-full flex flex-col items-center  justify-center'>
						<p className='font-bold text-xl'>View record</p>
						<p className='font-normal'>Contact Records</p>
					</div>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full  flex gap-x-4 items-center'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>
										First Name
									</FormLabel>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														{...field}
														// readOnly
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Last Name
										</FormLabel>
										<FormField
											control={form.control}
											name='surname'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															// readOnly
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Phone number
								</FormLabel>
								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
													// readOnly
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>Title</FormLabel>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
													// readOnly
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<DialogFooter className='sm:justify-start'>
								<DialogClose asChild>
									<div className='w-full flex items-center gap-x-4'>
										<div className='w-1/2'>
											<Button
												className={` w-full bg-[#DCF8FC]  h-10 mt-3 rounded-md flex items-center justify-center
                        `}
												type='button'
											>
												<p className={` font-bold`}>Close</p>
											</Button>
										</div>
										<div className='w-1/2'>
											<Button
												disabled={!form.formState.isValid}
												className={`w-full h-10 mt-3 rounded-md flex items-center justify-center
                        `}
												type='submit'
											>
												{form.formState.isSubmitting ? (
													<div className='w-full h-72 flex items-center justify-center'>
														<LuLoader className='w-8 h-8 text- animate-spin' />
													</div>
												) : (
													<p
														className={`${
															!form.formState.isValid ? "" : "text-white"
														} font-bold`}
													>
														Done!
													</p>
												)}
											</Button>
										</div>
									</div>
								</DialogClose>
							</DialogFooter>
						</div>
					</form>
				</div>
			</Form>
		</DialogContent>
	);
};

export default ViewContact;
