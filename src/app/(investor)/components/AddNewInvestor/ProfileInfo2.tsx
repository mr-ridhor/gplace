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
import {
	formatNumberWithCommas,
	numeralFormatter,
} from "@/lib/numeralFormatter";
import { getInvestor, setProfile2 } from "@/lib/slice/addInvestorSlice";
import { invpro2Schema } from "@/lib/zod-schema/invpro2Schema";

import { invpro2Type } from "@/lib/zod-type/invpro2Type";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	onNext: () => void;
	onBack: () => void;
}

const ProfileInfo2: React.FC<Props> = ({ onNext, onBack }) => {
	const dispatch = useDispatch();
	const profile2 = useSelector(getInvestor);
	const form = useForm<invpro2Type>({
		resolver: zodResolver(invpro2Schema),
		mode: "onChange",
		defaultValues: profile2,
	});
	const onSubmit = (data: invpro2Type) => {
		// console.log(data);
		dispatch(setProfile2(data));
		onNext();
	};
	return (
		<TabsContent value='profile2'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='flex items-center gap-x-4'>
								<div className='w-1/2 space-y-2'>
									<FormLabel className='text-sm font-normal'>
										Median deal Size ($ mm)
									</FormLabel>
									<FormField
										control={form.control}
										name='med'
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

								<div className='w-1/2 space-y-2'>
									<FormLabel className='font-normal text-sm'>
										AUM ($ mm)
									</FormLabel>
									<FormField
										control={form.control}
										name='aum'
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

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Deals in 5Y
								</FormLabel>
								<FormField
									control={form.control}
									name='deal'
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

							<div className='w-full flex items-center gap-x-4'>
								<Button
									onClick={onBack}
									className={`w-1/2 h-10 bg-[#DCF8FC] hover:bg-[#B9E5EB]  rounded-md flex items-center justify-center
                    `}
									type='button'
								>
									<p className={` font-bold`}>Back</p>
								</Button>
								<Button
									// onClick={handleClick}
									disabled={!form.formState.isValid}
									className={`w-1/2 h-10  rounded-md flex items-center justify-center
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

export default ProfileInfo2;
