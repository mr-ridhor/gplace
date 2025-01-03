"use client";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamSchema } from "@/lib/zod-schema/teamSchema";
import { teamType } from "@/lib/zod-type/teamType";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { getProfile, Team, updateTeamInfo } from "@/lib/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import moment from "moment";

const TeamInfoForm = () => {
	const dispatch = useDispatch();
	const { team } = useSelector(getProfile);
	useEffect(() => {
		form.reset(team);
	}, [team]);
	const form = useForm<Team>({
		resolver: zodResolver(teamSchema),
		defaultValues: team,
	});

	const onSubmit = async (data: Team) => {
		console.log(data);
		dispatch(updateTeamInfo(data));

		try {
			const response = await axios.put("/api/profile", { team: data });

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
	return (
		<DialogContent className='h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar'>
			<Form {...form}>
				<div className='px-2   space-y-6 overflow-y-auto no-scrollbar flex flex-col item-center w-full'>
					<div className='w-full items-center flex flex-col  '>
						<div className='w-full'>
							<strong className='text-sm xl:text-2xl text-left '>
								Team Information (Optional)
							</strong>
							<p className='font-light text-sm xl:text-lg'>
								Kindly complete the necessary fields to inform us about your
								team (2 users only).
							</p>
						</div>
					</div>
					<form
						action=''
						onSubmit={form.handleSubmit(onSubmit)}
						className='  items-center flex flex-col h-full '
					>
						<div className='space-y-5 w-full'>
							<div className='space-y-4'>
								<div className='w-full justify-end flex'>
									<p className='text-[10px] md:text-sm lg:text-base font-normal'>
										Team member 1
									</p>
								</div>
								<div className='w-full space-y-2'>
									<FormLabel className='text-[10px] md:text-sm lg:text-base font-normal'>
										Full Name
									</FormLabel>
									<FormField
										control={form.control}
										name='team1.fullName'
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
								<div className='w-full  flex gap-x-4'>
									<div className='w-full space-y-2'>
										<FormLabel className='text-[10px] md:text-sm lg:text-base font-normal'>
											Email Address
										</FormLabel>
										<FormField
											control={form.control}
											name='team1.email'
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
								</div>
							</div>
							<div className='space-y-4'>
								<div className='w-full justify-end flex'>
									<p className='text-[10px] md:text-sm lg:text-base font-normal'>
										Team member 2
									</p>
								</div>
								<div className='w-full space-y-2'>
									<FormLabel className='text-[10px] md:text-sm lg:text-base font-normal'>
										Full Name
									</FormLabel>
									<FormField
										control={form.control}
										name='team2.fullName'
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
								<div className='w-full  flex gap-x-4'>
									<div className='w-full space-y-2'>
										<FormLabel className='text-[10px] md:text-sm lg:text-base font-normal'>
											Email Address
										</FormLabel>
										<FormField
											control={form.control}
											name='team2.email'
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
								</div>
							</div>

							{/* <div className="w-full flex items-center gap-x-4"> */}
							{/* Button Container */}
							{/* <div className="w-1/2 flex items-center justify-center"> */}
							<DialogClose asChild>
								<Button
									className='w-full h-10 mt-3 rounded-md flex items-center justify-center'
									type='submit'
								>
									<p className='text-white font-bold'>Done</p>
								</Button>
							</DialogClose>
							{/* </div> */}
							{/* </div> */}
						</div>
					</form>
				</div>
			</Form>
		</DialogContent>
	);
};

export default TeamInfoForm;
