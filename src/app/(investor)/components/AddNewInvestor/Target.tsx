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
import {
	getInvestor,
	setTarget,
	// setOfferedPrice,
} from "@/lib/slice/addInvestorSlice";
import { invpro2Schema } from "@/lib/zod-schema/invpro2Schema";
import { targetSchema } from "@/lib/zod-schema/targetSchema";

import { invpro2Type } from "@/lib/zod-type/invpro2Type";
import { offeredPriceType } from "@/lib/zod-type/offerPriceType";
import { targetType } from "@/lib/zod-type/targetType";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	onNext: () => void;
	onBack: () => void;
}

const Target: React.FC<Props> = ({ onNext, onBack }) => {
	const dispatch = useDispatch();
	const target = useSelector(getInvestor).target;
	const form = useForm<targetType>({
		resolver: zodResolver(targetSchema),
		mode: "onChange",
		defaultValues: target,
	});
	const onSubmit = (data: targetType) => {
		console.log(data);
		dispatch(setTarget(data));

		onNext();
	};
	return (
		<TabsContent value='target'>
			<Form {...form}>
				<div className='    space-y-6 flex flex-col items-centr w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='   items-center flex flex-col h-full '
					>
						<div className='space-y-4 w-full'>
							<div className='w-full space-y-2'>
								{/* <FormLabel className="text-sm font-normal">
                  Revenue ($K0)
                </FormLabel>
                <FormField
                  control={form.control}
                  name="rev"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                          {...field}
                          value={formatNumberWithCommas(field.value || "")}
                          onChange={(e) =>
                            field.onChange(numeralFormatter(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                /> */}
								<FormLabel className='font-normal text-sm'>
									Revenue ($K)
								</FormLabel>
								<div className='flex w-full gap-x-2'>
									{/* From Field */}
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='rev.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='From $1k'
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
									{/* To Field */}
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='rev.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='To $1B'
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

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									EBITDA ($K)
								</FormLabel>
								<div className='flex w-full  gap-x-2'>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='ebdt.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='From $1B'
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
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='ebdt.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='To $1B'
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

							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Deal size ($K)
								</FormLabel>
								<div className='flex w-full h-fit  gap-x-2'>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='dealsz.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='From $1B'
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
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='dealsz.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='To $1B'
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
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									Offered Price ($K)
								</FormLabel>
								<FormField
									control={form.control}
									name='valuation'
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
									className={`w-1/2 h-10 bg-[#DCF8FC] hover:bg-[#B9E5EB]  rounded-md flex items-center justify-center
                    `}
									type='button'
								>
									<p className={` font-bold`}>Back</p>
								</Button>
								<Button
									// onClick={onNext}
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

export default Target;
