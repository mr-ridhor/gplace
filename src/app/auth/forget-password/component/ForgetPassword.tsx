"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResetPassword from "./ResetPassword";
import Link from "next/link";
import Email from "./Email";
import Otp from "./Otp";
import { pinType } from "@/lib/zod-type/pinType";
import { resetType } from "@/lib/zod-type/resetType";
import { emailType } from "@/lib/zod-type/emailType";
import Logo from "@/app/svgComponent/Logo";
import { useEffect, useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [otp, setOtp] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [step, setStep] = useState("email");
	const [time, setTime] = useState(0);

	useEffect(() => {
		const queryStep = searchParams.get("step");
		setStep(queryStep || "email"); // Default to "email" if no step is found
	}, [searchParams]);

	const handleNextStep = (nextStep: "email" | "otp" | "reset") => {
		router.push(`/auth/forget-password?step=${nextStep}`);
	};

	const handleEmailSubmit = async (data: emailType) => {
		const { email } = data;
		try {
			const response = await axios.post("/api/password", { email });
			console.log(response);
			if (response.status === 200) {
				const expirationTime = new Date(response.data.expires); // Assuming response.data.expires is a valid date string
				const now = new Date();
				setTime(Math.floor((expirationTime.getTime() - now.getTime()) / 1000));
				setUserEmail(email);
				// setTime(response.data.expires);
				handleNextStep("otp");
			}
		} catch (error) {
			console.error("Failed to submit email:", error);
		}
	};

	const handleOtpSubmit = async (data: pinType) => {
		const otpCode = data.otpCode;
		setOtp(otpCode);
		// console.log("OTP:", otpCode);
		// handleNextStep("reset");
		const response = await axios.post("/api/password/verify", {
			verificationCode: otpCode,
			email: userEmail,
		});
		if (response.status === 200) {
			handleNextStep("reset");
		}
		// Optionally, you might want to verify OTP with the server here
		// try {
		//
		// } catch (error) {
		//   console.error("Failed to verify OTP:", error);
		// }
	};

	const handlePasswordReset = async (data: resetType) => {
		const { newPassword } = data;

		try {
			const response = await axios.post("/api/password/reset", {
				email: userEmail,
				newPassword,
				verificationCode: otp,
			});
			if (response.status == 200) {
				// alert("Password successfully reset!");
				router.push("login"); // Redirect to login or another page as needed
			}
		} catch (error) {
			console.error("Failed to reset password:", error);
		}
	};

	const renderContent = () => {
		switch (step) {
			case "otp":
				return <Otp onSubmit={handleOtpSubmit} time={time} email={userEmail} />;
			case "reset":
				return <ResetPassword onSubmit={handlePasswordReset} />;
			case "email":
			default:
				return <Email onSubmit={handleEmailSubmit} />;
		}
	};

	return (
		<div className='h-screen overflow-hidden'>
			<div className='sticky top-0 w-full flex-1 flex justify-end px-5 items-center h-16 z-10'>
				<Link href='/auth/register'>Not a customer? Sign up</Link>
			</div>
			<div className='h-full overflow-hidden w-full flex items-center justify-center'>
				<div className='w-[300px] lg:w-[500px] h-[550px] space-y-4'>
					<div className='flex w-full justify-center my-4'>
						<Logo />
					</div>
					{renderContent()}
				</div>
			</div>
		</div>
	);
};

export default ForgetPassword;
