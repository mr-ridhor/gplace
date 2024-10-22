"use client";

import LoaderComponent from "@/components/LoaderComponent";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { pinSchema } from "@/lib/zod-schema/pinSchema";
import { pinType } from "@/lib/zod-type/pinType";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface OtpProps {
	onSubmit: (data: pinType) => void;
	email: string; // Pass email as a prop
	time: number; // Time in seconds for countdown
}

const Otp: React.FC<OtpProps> = ({ onSubmit, email, time }) => {
	const [isResending, setIsResending] = useState<boolean>(false); // For loading state on resend
	const [timeLeft, setTimeLeft] = useState<number>(time);
	const [showResend, setShowResend] = useState<boolean>(false);

	const form = useForm<pinType>({
		resolver: zodResolver(pinSchema),
		defaultValues: {
			otpCode: "",
		},
	});

	useEffect(() => {
		// Update the countdown every second
		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(intervalId);
					setShowResend(true); // Show resend button when countdown reaches 0
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(intervalId);
	}, []);

	const handleResend = async () => {
		setIsResending(true);
		try {
			const response = await axios.post("/api/password/", {
				email, // Use the email prop directly
			});
			if (response.status === 200) {
				console.log("OTP resent successfully");
				setTimeLeft(60); // Reset the countdown timer
				setShowResend(false); // Hide the resend button again
			}
		} catch (error) {
			console.error("Failed to resend OTP:", error);
		} finally {
			setIsResending(false);
		}
	};

	// const formatTime = (seconds: number) => {
	// 	const minutes = Math.floor(seconds / 60);
	// 	const remainingSeconds = seconds % 60;
	// 	return `${minutes}m ${remainingSeconds}s`;
	// };

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='w-full text-center'>
					<p className='font-bold'>Forgot Password</p>
					<p className='font-normal'>
						Check your email for a 5-digit OTP, input them in the field below,
						and reset your password.
					</p>
				</div>
				<div className='space-y-4 mt-3'>
					<FormField
						control={form.control}
						name='otpCode'
						render={({ field }) => (
							<FormItem className='justify-between w-full'>
								<FormControl>
									<div className='w-full flex justify-between'>
										<InputOTP
											containerClassName='w-full justify-between flex space-x-3'
											maxLength={5}
											className='flex w-full justify-between'
											{...field}
										>
											{[...Array(5)].map((_, index) => (
												<InputOTPGroup key={index}>
													<InputOTPSlot
														className='text-center focus:border-0 focus-visible:ring-[#04acc2] border rounded-md p-2'
														index={index}
													/>
												</InputOTPGroup>
											))}
										</InputOTP>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full text-white' type='submit'>
						{form.formState.isSubmitting ? (
							<div className='w-8 h-8'>
								<LoaderComponent className='text-white' />
							</div>
						) : (
							<p className='text-white font-bold'>Submit OTP</p>
						)}
					</Button>
				</div>
			</form>
			<div>
				{showResend ? (
					<Button
						className='w-full'
						type='button'
						onClick={handleResend}
						disabled={isResending}
					>
						{isResending ? (
							<LoaderComponent className='w-5 h-5' />
						) : (
							<p className='text-white font-bold'>Resend OTP</p>
						)}
					</Button>
				) : null}
			</div>
		</Form>
	);
};

export default Otp;
