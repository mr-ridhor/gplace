// import { MultiSelect } from "@/components/MultiSelect";
import MultipleSelector from "@/components/MultiSelect";
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
import { TabsContent } from "@/components/ui/tabs";
import { industries } from "@/lib/data/industry";
import {
	formatNumberWithCommas,
	numeralFormatter,
} from "@/lib/numeralFormatter";
import {
	getInvestor,
	setPrice,
	setProfile,
} from "@/lib/slice/addInvestorSlice";
import { invproSchema } from "@/lib/zod-schema/invproSchema";
import { invproType } from "@/lib/zod-type/invproType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { countries, geographies } from "../../../../../utils/getCountries";

interface Props {
	onNext: () => void;
	onBack: () => void;
	// setPro: React.Dispatch<React.SetStateAction<invproType>>;
	// profile: invproType;
}
const ProfileInfo: React.FC<Props> = ({ onNext, onBack }) => {
	const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
		"react",
		"angular",
	]);
	const dispatch = useDispatch();
	const profile = useSelector(getInvestor).profile;
	const form = useForm<invproType>({
		resolver: zodResolver(invproSchema),
		mode: "onChange",
		defaultValues: profile,
	});
	const onSubmit = (data: invproType) => {
		// console.log(data);
		dispatch(setProfile(data));
		// setPro(data);
		// alert("hi");
		onNext();
	};
	return (
		<TabsContent value='profile'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Investment industy
								</FormLabel>
								<FormField
									control={form.control}
									name='invInd'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<>
													<MultipleSelector
														{...field}
														defaultOptions={industries}
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														placeholder='Select Investment Industry(ies)...'
														onChange={(selected) => field.onChange(selected)}
													/>
												</>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Investment geographies
								</FormLabel>
								<FormField
									control={form.control}
									name='invGeo'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{/* <Input
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													{...field}
												/> */}
												{/* <Selects
													value={field.value}
													onChange={field.onChange}
													className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
													placeholder='Select Investment geography'
													options={countries.map((country) => ({
														value: country.name,
														label: country.name,
													}))}
												/> */}
												<>
													<MultipleSelector
														{...field}
														defaultOptions={geographies}
														className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
														placeholder='Select Investment Industry(ies)...'
														onChange={(selected) => field.onChange(selected)}
													/>
												</>
											</FormControl>
											<FormMessage className='text-[10px]' />
										</FormItem>
									)}
								/>
							</div>

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									# of deals in LTM
									{/* Typical deal size */}
								</FormLabel>
								<FormField
									control={form.control}
									name='noLTM'
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

							<div className='w-full flex items-center gap-x-4'>
								<Button
									onClick={onBack}
									// disabled={!form.formState.isValid}
									className={`w-1/2 h-10 rounded-md bg-[#DCF8FC] hover:bg-[#B9E5EB] flex items-center justify-center
                    `}
									type='button'
								>
									<p className={` font-bold`}>Back</p>
								</Button>
								<Button
									// onClick={handleClick}
									disabled={!form.formState.isValid}
									className={`w-1/2 h-10 rounded-md flex items-center justify-center
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

export default ProfileInfo;
