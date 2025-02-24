"use client";
import LoaderComponent from "@/components/LoaderComponent";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import axiosService from "@/lib/services/axiosService";
import {
	getInvestor,
	resetPayload,
	setContact,
} from "@/lib/slice/addInvestorSlice";
import {
	fetchInvestorsFailure,
	fetchInvestorsRequest,
	fetchInvestorsSuccess,
} from "@/lib/slice/investorSlice";
import { contSchema } from "@/lib/zod-schema/contSchema";
import { contType } from "@/lib/zod-type/contType";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	onBack: () => void;
	onTabReset: () => void;
	// price: priceType;
	// setPri: React.Dispatch<React.SetStateAction<priceType>>;
}
const Contact = ({ onBack, onTabReset }: Props) => {
	const dispatch = useDispatch();
	// const router = useRouter;
	const { data: session } = useSession();
	const { contact, companyInfo, profile, profile2, target, price } =
		useSelector(getInvestor);
	const form = useForm<contType>({
		resolver: zodResolver(contSchema),
		mode: "onChange",
		defaultValues: contact,
	});
	const loadInvestors = async () => {
		dispatch(fetchInvestorsRequest());
		try {
			const { data } = await axios.get("/api/investors");
			console.log("Fetched investors:", data); // Log the fetched data
			dispatch(fetchInvestorsSuccess(data));
		} catch (error: any) {
			console.error("Error fetching investors:", error); // Log the error
			dispatch(
				fetchInvestorsFailure(
					error.response?.data?.message || "Failed to fetch"
				)
			);
		}
	};

	const onSubmit = async (data: contType) => {
		// console.log(data);
		const industryValues = profile.invInd.map(
			(industry: { value: any }) => industry.value
		);
		const geographyValues = profile.invGeo.map(
			(industry: { value: any }) => industry.value
		);
		const payload = {
			companyInfo: {
				companyName: companyInfo.name,
				country: companyInfo.country,
				city: companyInfo.city,
				website: companyInfo.website,
				yearFounded: companyInfo.yearFounded,
				employeeNumber: companyInfo.noEmp,
				investorType: companyInfo.investorType,
				description: companyInfo.description,
			},
			investmentBio: {
				industry: industryValues,
				geography: geographyValues,
				dealsInLTM: profile.noLTM,
				medianDealSize: profile2.med,
				AUM: profile2.aum,
				dealsIn5Y: profile2.deal,
			},
			targetInfo: {
				revenue: {
					from: Number(target.rev.from),
					to: Number(target.rev.to),
				},
				EBITDA: {
					from: Number(target.ebdt.from),
					to: Number(target.ebdt.to),
				},
				dealSize: {
					from: Number(target.dealsz.from),
					to: Number(target.dealsz.to),
				},
			},
			offeredPriceValuation: Number(target.valuation),

			paidInfo: {
				valuation: {
					from: Number(price.val.from), // (required)
					to: Number(price.val.to), // (required)
				},
				revenue: {
					from: Number(price.evRev.from), // (required)
					to: Number(price.evRev.to), // (required)
				},
				EBITDA: {
					from: Number(price.evEbd.from), // (required)
					to: Number(price.evEbd.to), // (required)
				},
			},
			primaryContact: {
				name: data.name,
				surname: data.surname,
				email: data.email,
				phone: data.phone,
				title: data.title,
			},
		};
		console.log("payload", payload);

		dispatch(setContact(data));
		try {
			const res = await axios.post(`/api/investors`, payload);
			console.log(res);
			// window.location.reload();
			loadInvestors();
			dispatch(resetPayload());
			if (res.status == 200) {
				loadInvestors();
				dispatch(resetPayload());
				onTabReset();
			}
		} catch (error) {
			// console.log(error);
			console.error("Error submitting data:", error);
		}
	};

	return (
		<TabsContent value='contact'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full  flex gap-x-4 items-center'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>Name</FormLabel>
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
								<div className='w-1/2'>
									<div className='w-full space-y-2'>
										<FormLabel className='font-normal text-sm'>
											Surname
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
														/>
													</FormControl>
													<FormMessage className='text-[10px]' />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Contact Email
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
								<FormLabel className='font-normal text-sm'>
									Contact's Phone
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
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
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
												/>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<DialogFooter className='sm:justify-start'>
								<div className='w-full flex gap-x-4 items-center'>
									<div className='w-1/2'>
										<Button
											onClick={onBack}
											className={`w-full h-10 bg-[#DCF8FC] hover:bg-[#B9E5EB]  rounded-md flex items-center justify-center
                    `}
											type='button'
										>
											<p className={` font-bold`}>Back</p>
										</Button>
									</div>
									<DialogClose asChild>
										<div className='w-1/2 flex items-center gap-x-4'>
											<Button
												disabled={!form.formState.isValid}
												className={`w-full h-10  rounded-md flex items-center justify-center
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
														Done!
													</p>
												)}
											</Button>
										</div>
									</DialogClose>
								</div>
							</DialogFooter>
						</div>
					</form>
				</div>
			</Form>
		</TabsContent>
	);
};

export default Contact;
