import { Selects } from "@/components/Selects";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogHeader,
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
import { toast } from "@/components/ui/use-toast";
import {
	Bio,
	getProfile,
	setProfile,
	updatePersonalInfo,
} from "@/lib/slice/profileSlice";
import { personalSchema, bioSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import moment from "moment";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	onClose: () => void;
	isOpen: boolean; // New prop to determine if the dialog is open
}
const PersonalInfoForm = ({ onClose, isOpen }: Props) => {
	const dispatch = useDispatch();
	const { bio } = useSelector(getProfile);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const form = useForm<Bio>({
		resolver: zodResolver(bioSchema),
		defaultValues: {
			firstName: bio.firstName,
			lastName: bio.lastName,
			title: bio.title,
			city: bio.city,
			country: bio.country,
			email: bio.email,
			phone: bio.phone,
			linkedIn: bio.linkedIn,
			x: bio.x,
			// address: bio.address,
		},
	});
	const handleClose = () => {
		setShowConfirmation(true); // Show confirmation dialog
	};

	// Confirm exit
	const confirmExit = (confirm: boolean) => {
		if (confirm) {
			onClose(); // Close the form
		}
		setShowConfirmation(false); // Hide the confirmation dialog
	};
	const onSubmit = async (data: Bio) => {
		console.log(data);
		dispatch(updatePersonalInfo(data));

		try {
			const response = await axios.put("/api/profile", { bio: data });
			console.log(response);
			// dispatch(updatePersonalInfo(data));

			if (response.status === 200) {
				const result = response.data;
				// Handle success
				toast({
					title: `${result.message}`,
					description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
				});
			}
		} catch (error: any) {
			console.log(error);
			toast({
				title: `${error.data?.message}`,
				// title: `${error.data}`,
				description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
			});
			console.error("Error updating profile:", error);
		}
	};

	return (
		<DialogContent
			onInteractOutside={(e) => {
				e.preventDefault();
			}}
			className=' h-[450px] md:h-fit  max-h-[500px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar'
		>
			<div
				onClick={handleClose}
				className='flex flex-col h-8 right-1 absolute m-2 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 w-8 p-3 '
			>
				<GrClose size={24} color='black' />
			</div>
			<div className='py-4'>
				<DialogHeader className=' w-full flex text-lg '>
					<strong className='text-sm xl:text-2xl text-left '>
						Personal Information
					</strong>
					<p className='font-light text-sm xl:text-lg'>
						{" "}
						Complete your sign up process and get started with a 1 month free
						tria.
					</p>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full   items-center flex flex-col h-fit '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full  flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>
										First Name
									</FormLabel>
									<FormField
										control={form.control}
										name='firstName'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>
										Last Name
									</FormLabel>
									<FormField
										control={form.control}
										name='lastName'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='text-sm font-normal'>Title</FormLabel>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2]'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='forn-normal'>Email Address</FormLabel>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2]'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='text-sm font-normal'>Phone</FormLabel>
								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2]'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>
										LinkedIn
									</FormLabel>
									<FormField
										control={form.control}
										name='linkedIn'
										render={(field) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<FormLabel>X</FormLabel>
									<FormField
										control={form.control}
										name='x'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='w-full flex items-center gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel>Country</FormLabel>
									<FormField
										control={form.control}
										name='country'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<FormLabel>City</FormLabel>
									<FormField
										control={form.control}
										name='city'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='text-sm font-normal'>Address</FormLabel>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2]'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='w-full'>
							<DialogClose asChild>
								<Button
									// onClick={() => alert("Button clicked")}
									className='w-full h-10 mt-3   gap-x-1 rounded-md '
									type='submit'
								>
									<p className={`${"text-white"} font-bold`}>Done!</p>
								</Button>
							</DialogClose>
						</div>
					</form>
				</Form>
			</div>
			{showConfirmation && (
				<div className='absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10'>
					<div className='bg-white p-5 rounded-md shadow-md'>
						<p>Are you sure you want to exit?</p>
						<div className='w-full flex justify-center'>
							<div className='flex gap-4 mt-4 w-[80%]  justify-between'>
								<button
									onClick={() => confirmExit(true)}
									className='px-4 py-2 bg-[#04acc2] text-white  rounded-md'
								>
									Yes
								</button>
								<button
									onClick={() => confirmExit(false)}
									className='px-4 py-2 bg-[#CCC]  rounded-md'
								>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</DialogContent>
	);
};

export default PersonalInfoForm;
