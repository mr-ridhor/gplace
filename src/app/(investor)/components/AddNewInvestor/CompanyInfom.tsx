// "use client";
// import { Selects } from "@/components/Selects";
// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { MoveRight } from "lucide-react";
// import React, { useEffect } from "react";
// import { personalSchema } from "@/lib/zod-schema/personalSchema";
// import { personalType } from "@/lib/zod-type/personalType";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation"; // Import useRouter
// import { companyType } from "@/lib/zod-type/companyType";
// import { companySchema } from "@/lib/zod-schema/companySchema";
// import { YearSelect } from "@/components/YearSelect";
// import { TabsContent } from "@/components/ui/tabs";
// import { invcomType } from "@/lib/zod-type/invtcomType";
// import { invcomSchema } from "@/lib/zod-schema/invcomSchema";
// import { Textarea } from "@/components/ui/textarea";
// import { getInvestor, setCompanyInfo } from "@/lib/slice/addInvestorSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	formatNumberWithCommas,
// 	numeralFormatter,
// } from "@/lib/numeralFormatter";
// import { RootState } from "@/lib/services/StoreService";

// interface Props {
// 	onNext: () => void;
// }

// const CompanyInfom: React.FC<Props> = ({ onNext }) => {
// 	const dispatch = useDispatch();
// 	// const companyInfo = useSelector(getInvestor);
// 	// const companyInfo = useSelector((state: RootState) => state.companyInfo);
// 	const companyInfo = useSelector(
// 		(state: RootState) => state.addInvestor.companyInfo
// 	);
// 	// Initialize form with default values from Redux state
// 	const form = useForm<invcomType>({
// 		resolver: zodResolver(invcomSchema),
// 		mode: "onChange",
// 		defaultValues: {
// 			name: companyInfo?.name || "",
// 			country: companyInfo?.country || "",
// 			city: companyInfo?.city || "",
// 			website: companyInfo?.website || "",
// 			yearFounded: companyInfo?.yearFounded || "",
// 			noEmp: companyInfo?.noEmp || "",
// 			investorType: companyInfo?.investorType || "",
// 			description: companyInfo?.description || "",
// 		},
// 	});

// 	const onSubmit = (data: invcomType) => {
// 		dispatch(setCompanyInfo(data)); // Dispatch action to save company info
// 		console.log(data);
// 		onNext(); // Call onNext function to proceed
// 	};

// 	const onInputChange = (fieldName: string, value: any) => {
// 		dispatch(setCompanyInfo({ ...companyInfo, [fieldName]: value })); // Update Redux state on change
// 	};
// 	console.log("companyinfo", companyInfo);
// 	return (
// 		<TabsContent value='company'>
// 			<Form {...form}>
// 				<div className='space-y-6 flex flex-col items-center w-full'>
// 					<form
// 						onSubmit={form.handleSubmit(onSubmit)}
// 						className='flex flex-col items-center h-full w-full'
// 					>
// 						<div className='space-y-4 w-full'>
// 							{/* Company Name Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='text-sm font-normal'>
// 									Company name
// 								</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='name'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													onChange={(e) => {
// 														field.onChange(e); // Update local form state
// 														onInputChange("name", e.target.value); // Update Redux state on change
// 													}}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Country Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>Country</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='country'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													onChange={(e) => {
// 														field.onChange(e);
// 														onInputChange("country", e.target.value);
// 													}}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* City Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>City</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='city'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													onChange={(e) => {
// 														field.onChange(e);
// 														onInputChange("city", e.target.value);
// 													}}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Website Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>Website</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='website'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													onChange={(e) => {
// 														field.onChange(e);
// 														onInputChange("website", e.target.value);
// 													}}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Year Founded Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>
// 									Year founded
// 								</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='yearFounded'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													onChange={(e) => {
// 														field.onChange(e);
// 														onInputChange("yearFounded", e.target.value);
// 													}}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Number of Employees Input */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>
// 									Number of employees
// 								</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='noEmp'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Input
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													{...field}
// 													value={formatNumberWithCommas(field.value || "")}
// 													onChange={(e) =>
// 														field.onChange(numeralFormatter(e.target.value))
// 													}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Investor Type Select */}
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='text-sm font-normal'>
// 									Investor type
// 								</FormLabel>
// 								<FormField
// 									control={form.control}
// 									name='investorType'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<Selects
// 													value={field.value}
// 													onChange={field.onChange}
// 													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 													placeholder='Select Investor Type'
// 													options={[
// 														{ value: "Strategic", label: "Strategic" },
// 														{ value: "Financial", label: "Financial" },
// 													]}
// 												/>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Description Textarea */}
// 							<div className='w-full space-y-2'>
// 								<FormField
// 									control={form.control}
// 									name='description'
// 									render={({ field }) => (
// 										<FormItem>
// 											<FormControl>
// 												<div className='relative'>
// 													<Textarea
// 														className='focus:border-0 min-h-[100px] resize-none focus-visible:ring-[#04acc2] text-sm p0'
// 														{...field}
// 														maxLength={250}
// 														onChange={(e) => {
// 															field.onChange(e);
// 															onInputChange("description", e.target.value);
// 														}}
// 													/>
// 													<span className='absolute bottom-2 right-2 text-xs text-gray-500'>
// 														{field.value?.length || 0}/250
// 													</span>
// 												</div>
// 											</FormControl>
// 											<FormMessage className='text-[10px]' />
// 										</FormItem>
// 									)}
// 								/>
// 							</div>

// 							{/* Submit Button */}
// 							<div className='w-full flex items-center gap-x-4'>
// 								<Button
// 									disabled={!form.formState.isValid}
// 									className={`w-full h-10 rounded-md flex items-center justify-center`}
// 									type='submit'
// 								>
// 									<p
// 										className={`${
// 											!form.formState.isValid ? "" : "text-white"
// 										} font-bold`}
// 									>
// 										Next
// 									</p>
// 								</Button>
// 							</div>
// 						</div>
// 					</form>
// 				</div>
// 			</Form>
// 		</TabsContent>
// 	);
// };

// export default CompanyInfom;
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
import { MoveRight } from "lucide-react";
import React, { useEffect } from "react";
import { personalSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Import useRouter
import { companyType } from "@/lib/zod-type/companyType";
import { companySchema } from "@/lib/zod-schema/companySchema";
import { YearSelect } from "@/components/YearSelect";
import { TabsContent } from "@/components/ui/tabs";
import { invcomType } from "@/lib/zod-type/invtcomType";
import { invcomSchema } from "@/lib/zod-schema/invcomSchema";
import { Textarea } from "@/components/ui/textarea";
import { getInvestor, setCompanyInfo } from "@/lib/slice/addInvestorSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	formatNumberWithCommas,
	numeralFormatter,
} from "@/lib/numeralFormatter";
import { countries } from "../../../../../utils/getCountries";

interface Props {
	onNext: () => void;
	// onBack: () => void;
}
const CompanyInfom: React.FC<Props> = ({ onNext }) => {
	const dispatch = useDispatch();
	const companyInfo = useSelector(getInvestor).companyInfo;
	const form = useForm<invcomType>({
		resolver: zodResolver(invcomSchema),
		mode: "onChange",
		defaultValues: {
			name: companyInfo.name || "",
			country: companyInfo.country || "",
			city: companyInfo.city || "",
			description: companyInfo.description || "",
			investorType: companyInfo.investorType || "",
			website: companyInfo.website || "",
			noEmp: companyInfo.noEmp || "",
			yearFounded: companyInfo.yearFounded || "",
		},
	});
	console.log("company", companyInfo);
	const onSubmit = (data: invcomType) => {
		// alert("Hi");
		dispatch(setCompanyInfo(data));
		console.log(data);

		onNext();
	};
	const onInputChange = (fieldName: string, value: any) => {
		dispatch(setCompanyInfo({ ...companyInfo, [fieldName]: value }));
	};

	return (
		<TabsContent value='company'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full space-y-2'>
								<FormLabel className='text-sm font-normal'>
									Company name
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
													onChange={(e) => {
														field.onChange(e);
														onInputChange("name", e.target.value); // Update Redux state on change
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='w-full flex gap-x-4 '>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>Country</FormLabel>
									<FormField
										control={form.control}
										name='country'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													{/* <Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														{...field}
														onChange={(e) => {
															field.onChange(e);
															onInputChange("country", e.target.value); // Update Redux state on change
														}}
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
									<FormLabel className='font-normal text-sm'>City</FormLabel>
									<FormField
										control={form.control}
										name='city'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														{...field}
														onChange={(e) => {
															field.onChange(e);
															onInputChange("city", e.target.value); // Update Redux state on change
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
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
													onChange={(e) => {
														field.onChange(e);
														onInputChange("website", e.target.value); // Update Redux state on change
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex gap-x-4 '>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>
										Year founded
									</FormLabel>
									<FormField
										control={form.control}
										name='yearFounded'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														{...field}
														onChange={(e) => {
															field.onChange(e);
															onInputChange("yearFounded", e.target.value); // Update Redux state on change
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>
										Number of employees
									</FormLabel>
									<FormField
										control={form.control}
										name='noEmp'
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
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							{/* <div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Investor type
								</FormLabel>
								<FormField
									control={form.control}
									name='investorType'
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
							</div> */}
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm '>
									Investor type
								</FormLabel>
								<FormField
									control={form.control}
									name='investorType'
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
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Description
								</FormLabel>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className='relative'>
													<Textarea
														className='focus:border-0 min-h-[100px] resize-none focus-visible:ring-[#04acc2] text-sm p0'
														{...field}
														maxLength={250}
														onChange={(e) => {
															field.onChange(e);
															onInputChange("description", e.target.value); // Update Redux state on change
														}}
													/>

													<span className='absolute bottom-2 right-2 text-xs text-gray-500'>
														{field.value?.length || 0}/250
													</span>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex items-center gap-x-4'>
								<Button
									// onClick={handleClick}
									disabled={!form.formState.isValid}
									className={`w-full h-10   rounded-md flex items-center justify-center
                    `}
									type='submit'
								>
									<p
										className={`${
											!form.formState.isValid ? "" : "text-white"
										} font-bold`}
									>
										Next
									</p>
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</TabsContent>
	);
};

export default CompanyInfom;
