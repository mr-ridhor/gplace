"use client";
import { Selects } from "@/components/Selects";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { companyType } from "@/lib/zod-type/companyType";
import { CompanySchema, companySchema } from "@/lib/zod-schema/companySchema";
import { useRouter } from "next/navigation";
import { YearSelect } from "@/components/YearSelect";
import { useDispatch, useSelector } from "react-redux";
import {
	Company,
	getProfile,
	updateCompanyInfo,
} from "@/lib/slice/profileSlice";
import {
	// formatNumberWithCommas,
	numeralFormatter,
} from "@/lib/numeralFormatter";
import LoaderComponent from "@/components/LoaderComponent";
import { toast } from "@/components/ui/use-toast";
import moment from "moment";
import axios from "axios";
import { countries } from "../../../../../utils/getCountries";
import { industries } from "@/lib/data/industry";
import { GrClose } from "react-icons/gr";
interface Props {
	onClose: () => void;
	isOpen: boolean; // New prop to determine if the dialog is open
}
const CompanyInfoForm = ({ onClose, isOpen }: Props) => {
	const router = useRouter(); // Initialize router
	const dispatch = useDispatch();
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
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
	const { company } = useSelector(getProfile);
	const form = useForm<Company>({
		resolver: zodResolver(CompanySchema),
		mode: "onChange",
		defaultValues: {
			name: company.name,
			country: company.country,
			city: company.city,
			email: company.email,
			website: company.website,
			industry: company.industry,
			foundingYear: company.foundingYear,

			revenue: {
				ltm: company.revenue.ltm.toString(),
				previousYear: company.revenue.previousYear.toString(),
			},
			grossProfit: {
				ltm: company.grossProfit.ltm.toString(),
				previousYear: company.grossProfit.previousYear.toString(),
			},
			EBITDA: {
				ltm: company.EBITDA.ltm.toString(),
				previousYear: company.EBITDA.previousYear.toString(),
			},
		},
	});

	const formatNumberWithCommas = (value: string): string => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	// alert(typeof company.foundingYear);
	// Helper function to remove commas for submission
	const removeCommas = (value: string) => {
		return value.replace(/,/g, "");
	};
	const onSubmit = async (data: Company) => {
		const formData = {
			...data,
			revenue: {
				ltm: removeCommas(data.revenue.ltm),
				previousYear: removeCommas(data.revenue.previousYear),
			},
			grossProfit: {
				ltm: removeCommas(data.grossProfit.ltm),
				previousYear: removeCommas(data.grossProfit.previousYear),
			},
			EBITDA: {
				ltm: removeCommas(data.EBITDA.ltm),
				previousYear: removeCommas(data.EBITDA.previousYear),
			},
		};
		dispatch(updateCompanyInfo(formData));
		// alert(JSON.stringify(formData));

		try {
			const response = await axios.put("/api/profile", { company: formData });

			if (response.status === 200) {
				toast({
					title: `${response.data.message}`,
					description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
				});
			}
		} catch (error: any) {
			console.log(error);
			toast({
				title: `${error.response.data.message}`,
				description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
			});
		}
	};

	// const formatNumberWithCommas = (value: string): string => {
	//   // Ensure value is a string before calling replace
	//   return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// };

	return (
		<DialogContent
			onInteractOutside={(e) => {
				e.preventDefault();
			}}
			className='h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar'
		>
			{" "}
			<div
				onClick={handleClose}
				className='flex flex-col h-8 right-1 absolute m-2 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 w-8 p-3 '
			>
				<GrClose size={24} color='black' />
			</div>
			<Form {...form}>
				<div className='   space-y-6 flex flex-col items-center w-full'>
					<div className='w-full items-center flex flex-col  '>
						<div className='w-full'>
							<strong className='text-sm xl:text-2xl text-left '>
								Company Information
							</strong>
							<p className='font-light text-sm xl:text-lg'>
								Please fill in the required fields to let us know more about
								your company.
							</p>
						</div>
					</div>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full space-y-2'>
								<FormLabel className='text-sm font-normal'>
									Company Name
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
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full  flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>Country</FormLabel>

									<FormField
										control={form.control}
										name='country'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Selects
														value={String(field.value)}
														onChange={field.onChange}
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														placeholder='Select country'
														options={countries.map((country) => ({
															value: country.name,
															label: country.name,
														}))}
													/>
													{/* <Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
														placeholder='Enter country'
														// onChange={(e) => {
														//   field.onChange(e);
														//   dispatch(
														//     setCompanyInfo({
														//       ...companyInfo,
														//       city: e.target.value,
														//     })
														//   );
														// }}
													/> */}
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>City</FormLabel>

									<FormField
										control={form.control}
										name='city'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													{/* <Selects
                            value={field.value}
                            onChange={field.onChange}
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                            placeholder="Ireland"
                            options={[
                              { value: "s", label: "Fr" },
                              { value: "s4", label: "eng" },
                            ]}
                          /> */}
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
														placeholder='Enter city'
														// onChange={(e) => {
														//   field.onChange(e);
														//   dispatch(
														//     setCompanyInfo({
														//       ...companyInfo,
														//       city: e.target.value,
														//     })
														//   );
														// }}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Company Email
								</FormLabel>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>Website</FormLabel>
								<FormField
									control={form.control}
									name='website'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>Industry</FormLabel>
								<FormField
									control={form.control}
									name='industry'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{/* <Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
												/> */}
												<Selects
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select Investment industry'
													options={industries.map((industry) => ({
														value: industry.value,
														label: industry.value,
													}))}
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full  flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>
										Founding Year
									</FormLabel>
									<FormField
										control={form.control}
										name='foundingYear'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<YearSelect
														value={String(field.value)}
														onChange={field.onChange}
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														placeholder='Select Year'
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Revenue (LTM, $K)
										</FormLabel>
										<FormField
											control={form.control}
											name='revenue.ltm'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															value={formatNumberWithCommas(field.value || "")}
															onChange={(e) =>
																field.onChange(numeralFormatter(e.target.value))
															}
														/>
													</FormControl>
													<FormMessage className='text-[10px]' />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className='w-full  flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Revenue (Previous year, $K)
										</FormLabel>
										<FormField
											control={form.control}
											name='revenue.previousYear'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															// onChange={(e) =>
															// 	field.onChange(
															// 		Number(removeCommas(e.target.value))
															// 	)
															// }
															value={formatNumberWithCommas(field.value || "")}
															onChange={(e) =>
																field.onChange(numeralFormatter(e.target.value))
															}
														/>
													</FormControl>
													<FormMessage className='text-[10px]' />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className='w-1/2 space-y-2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Gross profit(LTM, $K)
										</FormLabel>
										<FormField
											control={form.control}
											name='grossProfit.ltm'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															// onChange={(e) =>
															// 	field.onChange(
															// 		Number(removeCommas(e.target.value))
															// 	)
															// }
															value={formatNumberWithCommas(field.value || "")}
															onChange={(e) =>
																field.onChange(numeralFormatter(e.target.value))
															}
														/>
													</FormControl>
													<FormMessage className='text-[10px]' />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className='w-full  flex gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Gross profit (Previous year, $K)
										</FormLabel>
										<FormField
											control={form.control}
											name='grossProfit.previousYear'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															// onChange={(e) =>
															// 	field.onChange(
															// 		Number(removeCommas(e.target.value))
															// 	)
															// }
															value={formatNumberWithCommas(field.value || "")}
															onChange={(e) =>
																field.onChange(numeralFormatter(e.target.value))
															}
														/>
													</FormControl>
													<FormMessage className='text-[10px]' />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className='w-1/2 space-y-2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											EBITDA
										</FormLabel>
										<FormField
											control={form.control}
											name='EBITDA.ltm'
											render={({ field }) => {
												console.log(
													"here",
													field.value.toString(),
													typeof field.value.toString()
												);
												let me = formatNumberWithCommas(
													field.value.toString() || ""
												);
												return (
													<FormItem>
														<FormControl>
															<Input
																className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
																{...field}
																// onChange={(e) =>
																// 	field.onChange(
																// 		Number(removeCommas(e.target.value))
																// 	)
																// }
																// 	value={me}
																// 	onChange={(e) =>
																// 		field.onChange(
																// 			numeralFormatter(e.target.value)
																// 		)
																// 	}
																value={formatNumberWithCommas(
																	field.value || ""
																)}
																onChange={(e) =>
																	field.onChange(
																		numeralFormatter(e.target.value)
																	)
																}
															/>
														</FormControl>
														<FormMessage className='text-[10px]' />
													</FormItem>
												);
											}}
										/>
									</div>
								</div>
							</div>

							<div className='w-full flex  gap-x-4'>
								{/* Input Field Container */}
								<div className='w-1/2 flex flex-col space-y-2'>
									<FormLabel className='font-normal text-sm'>
										EBITDA (Previous year, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='EBITDA.previousYear'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2]'
														{...field}
														// value={formatNumberWithCommas(String(field.value))}
														value={formatNumberWithCommas(field.value || "")}
														// onChange={(e) =>
														// 	field.onChange(
														// 		Number(removeCommas(e.target.value))
														// 	)
														// }
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
														}
														// value={field.value.toString()}
													/>
												</FormControl>
												<FormMessage className='text-[10px]' />
											</FormItem>
										)}
									/>
								</div>

								{/* Button Container */}
								<div className='w-1/2 flex  space-y-2 justify-center'>
									<DialogClose asChild>
										<Button
											// disabled={!form.formState.isValid}
											className='w-full h-10 mt-6 xl:mt-7 rounded-md flex items-center justify-center'
											type='submit'
										>
											{form.formState.isSubmitting ? (
												<div className='w-8 h-8'>
													<LoaderComponent className='text-white' />
												</div>
											) : (
												<p className='text-white font-bold'>Done</p>
											)}
										</Button>
									</DialogClose>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Form>
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

export default CompanyInfoForm;
