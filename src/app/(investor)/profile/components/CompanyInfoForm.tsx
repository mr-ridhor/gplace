"use client";
import { Selects } from "@/components/Selects";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
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
import React, { useEffect } from "react";
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

const CompanyInfoForm = () => {
	const router = useRouter(); // Initialize router
	const dispatch = useDispatch();
	const { company } = useSelector(getProfile);
	const form = useForm<Company>({
		resolver: zodResolver(CompanySchema),
		defaultValues: {
			name: company.name,
			country: company.country,
			city: company.city,
			email: company.email,
			website: company.website,
			industry: company.industry,
			foundingYear: company.foundingYear,

			revenue: {
				ltm: company.revenue.ltm,
				previousYear: company.revenue.previousYear,
			},
			grossProfit: {
				ltm: company.grossProfit.ltm,
				previousYear: company.grossProfit.previousYear,
			},
			EBITDA: {
				ltm: company.EBITDA.ltm,
				previousYear: company.EBITDA.previousYear,
			},
		},
	});
	useEffect(() => {
		form.reset(company);
	}, [company]);
	// console.log("company", company);
	const formatNumberWithCommas = (value: string) => {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
				ltm: data.revenue.ltm,
				previousYear: data.revenue.previousYear,
			},
			EDITDA: {
				ltm: data.EBITDA.ltm,
				previousYear: data.EBITDA.previousYear,
			},
			grossProfit: {
				ltm: data.grossProfit.ltm,
				previousYear: data.grossProfit.previousYear,
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
		<DialogContent className='h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar'>
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
											<FormMessage />
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
													{/* <Selects
                            value={field.value}
                            onChange={field.onChange}
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                            placeholder="Ireland"
                            options={[
                              { value: "fr", label: "Fr" },
                              { value: "eng", label: "Eng" },
                            ]}
                          /> */}
													<Input
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
													/>
												</FormControl>
												<FormMessage />
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
												<FormMessage />
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
											<FormMessage />
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
											<FormMessage />
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
													// value={field.value}
													{...field}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select  Investment industry'
													options={[
														{ value: "Manufacturing", label: "Manufacturing" },
														{ value: "Software", label: "Software" },
														{ value: "Other", label: "Other" },
														{ value: "Financial", label: "Financial" },
													]}
												/>
											</FormControl>
											<FormMessage />
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
												<FormMessage />
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
															value={formatNumberWithCommas(
																String(field.value)
															)}
															onChange={(e) =>
																field.onChange(
																	Number(removeCommas(e.target.value))
																)
															}
														/>
													</FormControl>
													<FormMessage />
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
															value={formatNumberWithCommas(
																String(field.value)
															)}
															onChange={(e) =>
																field.onChange(
																	Number(removeCommas(e.target.value))
																)
															}
														/>
													</FormControl>
													<FormMessage />
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
															value={formatNumberWithCommas(
																String(field.value)
															)}
															onChange={(e) =>
																field.onChange(
																	Number(removeCommas(e.target.value))
																)
															}
														/>
													</FormControl>
													<FormMessage />
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
															value={formatNumberWithCommas(
																String(field.value)
															)}
															onChange={(e) =>
																field.onChange(
																	Number(removeCommas(e.target.value))
																)
															}
														/>
													</FormControl>
													<FormMessage />
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
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															value={formatNumberWithCommas(
																String(field.value)
															)}
															onChange={(e) =>
																field.onChange(
																	Number(removeCommas(e.target.value))
																)
															}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div className='w-full flex items-center gap-x-4'>
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
														value={formatNumberWithCommas(String(field.value))}
														onChange={(e) =>
															field.onChange(
																Number(removeCommas(e.target.value))
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Button Container */}
								<div className='w-1/2 flex items-center justify-center'>
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
								</div>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</DialogContent>
	);
};

export default CompanyInfoForm;
