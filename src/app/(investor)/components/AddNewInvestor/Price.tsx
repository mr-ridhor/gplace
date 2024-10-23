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
import { getInvestor, setPrice } from "@/lib/slice/addInvestorSlice";
import { priceSchema } from "@/lib/zod-schema/priceSchema";
import { priceType } from "@/lib/zod-type/priceType";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	onNext: () => void;
	onBack: () => void;
}

const Price: React.FC<Props> = ({ onNext, onBack }) => {
	const dispatch = useDispatch();
	const price = useSelector(getInvestor);
	const form = useForm<priceType>({
		resolver: zodResolver(priceSchema),
		mode: "onChange",
		defaultValues: price,
	});

	// Helper function to ensure the value is always shown with 2 decimal places
	// const formatTwoDecimals = (value: string) => {
	// 	const formattedValue = parseFloat(value).toFixed(2);
	// 	return isNaN(parseFloat(formattedValue)) ? "" : formattedValue;
	// };

	// const handleDecimalInputChange = (field: any, value: string) => {
	// 	// Convert input to a number, format to two decimals
	// 	const numericValue = parseFloat(value);
	// 	const formattedValue = isNaN(numericValue) ? "" : numericValue.toFixed(2);
	// 	field.onChange(formattedValue);
	// };
	const onSubmit = (data: priceType) => {
		console.log(data);
		dispatch(setPrice(data));
		onNext();
	};

	return (
		<TabsContent value='price'>
			<Form {...form}>
				<div className='space-y-6 flex flex-col items-center w-full'>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='items-center flex flex-col h-full w-full'
					>
						<div className='space-y-4 w-full'>
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>Valuation</FormLabel>
								<div className='w-full gap-x-4 flex items-center'>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='val.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder='From $1B'
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															type='number'
															step={0.0}
															// value={formatNumberWithCommas(field.value || "")}
															// onChange={(e) =>
															// 	field.onChange(numeralFormatter(e.target.value))
															// }
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='val.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder='From $1B'
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															type='number'
															step={0.0}
															// value={formatNumberWithCommas(field.value || "")}
															// onChange={(e) =>
															// 	field.onChange(numeralFormatter(e.target.value))
															// }
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							{/* EV/Revenue Fields */}
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>
									EV/Revenue
								</FormLabel>
								<div className='w-full flex gap-x-4 items-center'>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='evRev.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder='From 1.00x'
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															type='number'
															step={0.0}
															// value={
															// 	field.value !== undefined
															// 		? field.value.toString()
															// 		: ""
															// }
															// onChange={(e) =>
															// 	handleDecimalInputChange(field, e.target.value)
															// }
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='evRev.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															type='number'
															step={0.0}
															placeholder='To 10.40x'
															// value={formatTwoDecimals(field.value || "")}
															// onChange={(e) =>
															// 	field.onChange(
															// 		formatTwoDecimals(e.target.value)
															// 	)
															// }
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							{/* EV/EBITDA Fields */}
							<div className='w-full space-y-2'>
								<FormLabel className='font-normal text-sm'>EV/EBITDA</FormLabel>
								<div className='w-full flex gap-x-4 items-center'>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='evEbd.from'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															type='number'
															step={0.0}
															placeholder='From 1.00x'
															// value={formatTwoDecimals(field.value || "")}
															// onChange={(e) =>
															// 	field.onChange(
															// 		formatTwoDecimals(e.target.value)
															// 	)
															// }
															// value={field.value || ""}
															// onChange={(e) =>
															// 	handleDecimalInputChange(field, e.target.value)
															// }
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className='w-1/2'>
										<FormField
											control={form.control}
											name='evEbd.to'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															type='number'
															step={0.0}
															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
															{...field}
															placeholder='To 10.40x'
															// value={formatTwoDecimals(field.value || "")}
															// onChange={(e) =>
															// 	field.onChange(
															// 		formatTwoDecimals(e.target.value)
															// 	)
															// }
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
								<Button
									onClick={onBack}
									className={`w-1/2 h-10 bg-[#DCF8FC] hover:bg-[#B9E5EB] rounded-md flex items-center justify-center`}
									type='button'
								>
									<p className={`font-bold`}>Back</p>
								</Button>
								<Button
									disabled={!form.formState.isValid}
									className={`w-1/2 h-10 rounded-md flex items-center justify-center`}
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

export default Price;

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
// import { TabsContent } from "@/components/ui/tabs";
// import {
// 	formatNumberWithCommas,
// 	numeralFormatter,
// } from "@/lib/numeralFormatter";
// import { getInvestor, setPrice } from "@/lib/slice/addInvestorSlice";
// import { priceSchema } from "@/lib/zod-schema/priceSchema";
// import { priceType } from "@/lib/zod-type/priceType";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";

// interface Props {
// 	onNext: () => void;
// 	onBack: () => void;
// 	// price: priceType;
// 	// setPri: React.Dispatch<React.SetStateAction<priceType>>;
// }
//  // Function to format input to two decimal places
//  const handleDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   let { value } = e.target;

//   // Convert the value to a float and force it to two decimal places
//   const formattedValue = parseFloat(value).toFixed(2);

//   // Return the formatted value or an empty string if invalid
//   return isNaN(parseFloat(formattedValue)) ? "" : formattedValue;
// };
// const Price: React.FC<Props> = ({ onNext, onBack }) => {
// 	const dispatch = useDispatch();
// 	const price = useSelector(getInvestor);
// 	const form = useForm<priceType>({
// 		resolver: zodResolver(priceSchema),
// 		mode: "onChange",
// 		defaultValues: price,
// 	});

// 	const onSubmit = (data: priceType) => {
// 		// alert("HI");
// 		console.log(data);
// 		dispatch(setPrice(data));
// 		// setPri(data);
// 		onNext();
// 	};
// 	return (
// 		<TabsContent value='price'>
// 			<Form {...form}>
// 				<div className='    space-y-6 flex flex-col items-centr w-full'>
// 					<form
// 						action=''
// 						onSubmit={form.handleSubmit(onSubmit)}
// 						className='   items-center flex flex-col h-full '
// 					>
// 						<div className='space-y-4 w-full'>
// 							<div className='w-full space-y-2'>
// 								<FormLabel className='text-sm font-normal'>
// 									Valuation ($K)
// 								</FormLabel>
// 								<div className='w-full flex gap-x-4 items-center'>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='val.from'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															placeholder='From $1B'
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='val.to'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															placeholder='To $1B'
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 								</div>
// 							</div>

// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>
// 									EV/Revenue
// 								</FormLabel>
// 								<div className='w-full flex gap-x-4 items-center'>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='evRev.from'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															placeholder='From 1.00x'
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='evRev.to'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															placeholder='To 10.40x'
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 								</div>
// 							</div>

// 							<div className='w-full space-y-2'>
// 								<FormLabel className='font-normal text-sm'>EV/EBITDA</FormLabel>

// 								<div className='w-full flex gap-x-4 items-center'>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='evEbd.from'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															placeholder='From 1.00x'
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 									<div className='w-1/2'>
// 										<FormField
// 											control={form.control}
// 											name='evEbd.to'
// 											render={({ field }) => (
// 												<FormItem>
// 													<FormControl>
// 														<Input
// 															className='focus:border-0 focus-visible:ring-[#04acc2] text-sm'
// 															{...field}
// 															placeholder='To 10.40x'
// 															value={formatNumberWithCommas(field.value || "")}
// 															onChange={(e) =>
// 																field.onChange(numeralFormatter(e.target.value))
// 															}
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 							{/* <div className="w-full space-y-2">
//                 <FormLabel className="font-normal text-sm">
//                   Offered Price
//                 </FormLabel>
//                 <FormField
//                   control={form.control}
//                   name="offeredPrice"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
//                           {...field}
//                           value={formatNumberWithCommas(field.value || "")}
//                           onChange={(e) =>
//                             field.onChange(numeralFormatter(e.target.value))
//                           }
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div> */}
// 							<div className='w-full flex items-center gap-x-4'>
// 								<Button
// 									onClick={onBack}
// 									className={`w-1/2 h-10 bg-[#DCF8FC] hover:bg-[#B9E5EB]  rounded-md flex items-center justify-center
//                     `}
// 									type='button'
// 								>
// 									<p className={` font-bold`}>Back</p>
// 								</Button>
// 								<Button
// 									// onClick={handleClick}
// 									disabled={!form.formState.isValid}
// 									className={`w-1/2 h-10  rounded-md flex items-center justify-center
//                     `}
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

// export default Price;
