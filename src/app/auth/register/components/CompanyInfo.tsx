"use client";

import { Selects } from "@/components/Selects";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MoveLeft, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyType } from "@/lib/zod-type/companyType";
import { companySchema } from "@/lib/zod-schema/companySchema";
import { YearSelect } from "@/components/YearSelect";
import { useDispatch, useSelector } from "react-redux";
import { getRegister, setCompanyInfo } from "@/lib/slice/registerSlice";
import LoaderComponent from "@/components/LoaderComponent";

import {
	formatNumberWithCommas,
	numeralFormatter,
} from "@/lib/numeralFormatter";
import axios from "axios";
import moment from "moment";
import { toast } from "sonner";
import { industries } from "@/lib/data/industry";
import { countries } from "../../../../../utils/getCountries";

interface CompanyInfoProps {
	onNext: () => void;
	onBack: () => void;
}
const CompanyInfo: React.FC<CompanyInfoProps> = ({ onNext, onBack }) => {
	const router = useRouter();
	const a = usesState();
	const dispatch = useDispatch();
	// const { companyInfo, personalInfo } = useSelector(getRegister);
	const form = useForm<companyType>({
		resolver: zodResolver(companySchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			country: "",
			website: "",
			city: "",
			industry: "",
			foundingYear: "",
			revenue: {
				ltm: "",
				previousYear: "",
			},
			grossProfit: {
				ltm: "",
				previousYear: "",
			},
			EBITDA: {
				ltm: "",
				previousYear: "",
			},
		},
		// {
		// 	name: companyInfo.name,
		// 	country: companyInfo.country,
		// 	city: companyInfo.city,
		// 	website: companyInfo.website,
		// 	industry: companyInfo.industry,
		// 	foundingYear: companyInfo.foundingYear,
		// 	revenue: {
		// 		ltm: companyInfo.revenue.ltm,
		// 		previousYear: companyInfo.revenue?.previousYear || "a",
		// 	},
		// 	grossProfit: {
		// 		ltm: companyInfo.grossProfit?.ltm || "a",
		// 		previousYear: companyInfo.grossProfit?.previousYear || "a",
		// 	},
		// 	EBITDA: {
		// 		ltm: companyInfo.EBITDA?.ltm || "a",
		// 		previousYear: companyInfo.EBITDA?.previousYear || "a",
		// 	},
		// },
	});

	const onSubmit = async (data: companyType) => {
		dispatch(setCompanyInfo(data));

		// const cleanedData = {
		// 	...companyInfo,
		// 	revenue: {
		// 		ltm: numeralFormatter(companyInfo.revenue.ltm || "0"),
		// 		previousYear: numeralFormatter(
		// 			companyInfo.revenue?.previousYear || "0"
		// 		),
		// 	},
		// 	grossProfit: {
		// 		ltm: numeralFormatter(companyInfo.grossProfit?.ltm || "0"),
		// 		previousYear: numeralFormatter(
		// 			companyInfo.grossProfit?.previousYear || "0"
		// 		),
		// 	},
		// 	EBITDA: {
		// 		ltm: numeralFormatter(companyInfo.EBITDA?.ltm || "0"),
		// 		previousYear: numeralFormatter(companyInfo.EBITDA?.previousYear || "0"),
		// 	},
		// };

		// const credentials = {
		// 	email: personalInfo.email,
		// 	password: personalInfo.password,
		// };

		// const payload = {
		// 	bio: personalInfo,
		// 	company: cleanedData,
		// 	credentials,
		// };

		// console.log("cred", payload);

		// try {
		// 	const response = await axios.post(`/api/signup`, payload, {
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// 	console.log("res", response);

		// 	if (response.status === 201) {
		// 		toast(response.data.message, {
		// 			description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
		// 		});
		// 		onNext();
		// 		router.push(`/auth/register?step=otp`);
		// 		// reset(); : Reset form after submission
		// 	}

		// 	if (response.status !== 201) {
		// 		throw new Error("Failed to submit the data");
		// 	}
		// } catch (error: any) {
		// 	console.error("Error submitting data:", error);
		// 	toast("Form can't be submitted", {
		// 		description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
		// 	});
		// }

		// onNext();
		// router.push("/auth/register?step=team-info");
	};
	return (
		<Form {...form}>
			<div className=' h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full'>
				<div className='w-[90%] md:w-[85%] lg:w-[55%] xl:w-[500px] items-center flex flex-col mt-10  '>
					<div className='w-full'>
						<strong className='text-sm xl:text-2xl text-left '>
							Company Information
						</strong>
						<p className='font-light text-sm xl:text-lg'>
							Please fill in the required fields to let us know more about your
							company.
						</p>
					</div>
				</div>
				<form
					action=''
					onSubmit={form.handleSubmit(onSubmit)}
					className=' w-[90%] md:w-[80%] lg:w-[55%] xl:w-[500px]  items-center flex flex-col h-full '
				>
					<div className='space-y-4 w-full'>
						<div className='w-full space-y-2'>
							<FormLabel className='text-[10px] md:text-sm lg:text-base font-normal'>
								Company Name
							</FormLabel>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='w-full flex gap-x-4'>
							<div className='w-1/2 space-y-2'>
								<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
									Country
								</FormLabel>
								<FormField
									control={form.control}
									name='country'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{/* <Input
													className='focus:border-0 focus-visible:ring-[#04acc2]'
													{...field}
													placeholder='Enter country'

													// onChange={(e) => {
													//   field.onChange(e);
													//   dispatch(
													//     setCompanyInfo({
													//       ...companyInfo,
													//       country: e.target.value,
													//     })
													//   );
													// }}
												/> */}
												<Selects
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select Country'
													options={countries.map((country) => ({
														value: country.name,
														label: country.name,
													}))}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-1/2 space-y-2'>
								<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
									City
								</FormLabel>
								<FormField
									control={form.control}
									name='city'
									render={({ field }) => (
										<FormItem>
											<FormControl>
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
							<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
								Website
							</FormLabel>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='w-full flex gap-x-4 items-center s-y-2'>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
									Industry
								</FormLabel>
								<FormField
									control={form.control}
									name='industry'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{/* <Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
													{...field}
												/> */}
												{/* <Selects
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select  Industry Type'
													options={[
														{ value: "strategic", label: "Strategic" },
														{ value: "health", label: "Health" },
													]}
												/> */}
												{/* <Selects
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select  Investment industry'
													options={[
														{ value: "Manufacturing", label: "Manufacturing" },
														{ value: "Software", label: "Software" },
														{ value: "Other", label: "Other" },
													]}
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
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* <div className='w-1/2 space-y-2'>
								<div className='w-full space-y-2'>
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										Investor type
									</FormLabel>
									<FormField
										control={form.control}
										name='industryType'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Selects
														value={field.value}
														onChange={field.onChange}
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														placeholder='Select  Investor Type'
														options={[
															{ value: "Strategic", label: "Strategic" },
															{ value: "Financial", label: "Financial" },
														]}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div> */}
						</div>
						<div className='w-full  flex gap-x-4'>
							<div className='w-1/2 space-y-2'>
								<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
									Founding Year
								</FormLabel>
								<FormField
									control={form.control}
									name='foundingYear'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<YearSelect
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
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
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										Revenue (LTM, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='revenue.ltm'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
														{...field}
														value={formatNumberWithCommas(field.value || "")}
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
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
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										Revenue (Previous year, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='revenue.previousYear'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
														{...field}
														value={formatNumberWithCommas(field.value || "")}
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
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
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										Gross Profit (LTM, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='grossProfit.ltm'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
														{...field}
														value={formatNumberWithCommas(field.value || "")}
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
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
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										Gross Profit (Previous year, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='grossProfit.previousYear'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
														{...field}
														value={formatNumberWithCommas(field.value || "")}
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
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
									<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
										EBITDA (LTM, $K)
									</FormLabel>
									<FormField
										control={form.control}
										name='EBITDA.ltm'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base'
														{...field}
														value={formatNumberWithCommas(field.value || "")}
														onChange={(e) =>
															field.onChange(numeralFormatter(e.target.value))
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
							<div className='w-full flex flex-col space-y-2'>
								<FormLabel className='font-normal text-[10px] md:text-sm lg:text-base'>
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
													{...field}
													value={formatNumberWithCommas(field.value || "")}
													onChange={(e) =>
														field.onChange(numeralFormatter(e.target.value))
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Button Container */}
						</div>
						<div className='w-full flex items-center gap-x-2'>
							<Button
								onClick={onBack}
								// onClick={() => router.push("/auth/register")}
								className='w-1/2 h-10    gap-x-1 rounded-md '
								type='button'
							>
								<MoveLeft color={`${"white"}`} />
								<p className={`${"text-white"} font-bold`}>Back</p>

								{/* )} */}
							</Button>
							<Button
								disabled={!form.formState.isValid}
								className={`w-1/2 h-10 rounded-md flex items-center justify-center
                        `}
								type='submit'
							>
								{form.formState.isSubmitting ? (
									<div className='w-8 h-8'>
										<LoaderComponent className='text-white' />
									</div>
								) : (
									<p
										className={`${
											!form.formState.isValid ? "" : "text-white"
										} font-bold`}
									>
										Complete
									</p>
								)}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Form>
	);
};

export default CompanyInfo;
