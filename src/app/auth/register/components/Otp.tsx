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
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { pinType } from "@/lib/zod-type/pinType";
import { pinSchema } from "@/lib/zod-schema/pinSchema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useSelector } from "react-redux";
import axios from "axios";
import { getRegister } from "@/lib/slice/registerSlice";

interface Props {
  onNext: () => void;
}
const Otp: React.FC<Props> = ({ onNext }) => {
  const router = useRouter();
  const { credentials } = useSelector(getRegister);
  const form = useForm<pinType>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const onSubmit = async (data: pinType) => {
    console.log(data);
    // Navigate to the company-info step
    const payload = {
      email: credentials.email,
      verificationCode: data.otpCode,
    };
    console.log(payload);
    try {
      const response = await axios.post(`api/email/otp`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // OTP is valid, proceed to the next step (e.g., login or dashboard)
        alert("OTP verified successfully!");
        onNext();
        router.push("/auth/register?step=plan");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP submission error:", error);
      alert("OTP verification failed. Please try again.");
    }
  };
  return (
    <Form {...form}>
      <div className=" h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
        <div className="w-[90%] md:w-[85%] lg:w-[55%] xl:w-[500px] items-center flex flex-col mt-14  ">
          <div className="w-full">
            <strong className="text-sm xl:text-2xl text-left ">
              Email Verification
            </strong>
            <p className="font-light text-sm xl:text-lg">
              Check your email for a 4 digits OTP , input them in the field
              below and verify your email
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[90%] md:w-[80%] lg:w-[55%] xl:w-[500px]   items-center flex flex-col h-full "
        >
          <div className="space-y-5 w-full ">
            <FormLabel className="text-center">Enter OTP</FormLabel>

            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem className=" justify-between w-full ">
                  <FormControl>
                    <div className="w-full  flex justify-between">
                      <InputOTP
                        containerClassName="w-full justify-between flex space-x-3"
                        maxLength={5}
                        className="flex w-full justify-between "
                        {...field}
                      >
                        {[...Array(5)].map((_, index) => (
                          <InputOTPGroup key={index} className="">
                            <InputOTPSlot
                              className="text-center  focus:border-0 focus-visible:ring-[#04acc2]   border rounded-md p-2"
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

            <div className="w-full flex items-center justify-center gap-x-4">
              <Button
                className="w-full h-10 mt-3 rounded-md flex items-center justify-center"
                type="submit"
              >
                <p className="text-white font-bold">Complete</p>
              </Button>
            </div>
          </div>
        </form>
        <div className="w-full flex items-center justify-start gap-x-4">
          <button
            className="w-ful h-0 mt- bg-transparent hover:bg-transparent rounded-md flex items-center justify-center"
            // type="submit"
          >
            <p className=" font-bold">Resend otp</p>
          </button>
        </div>
      </div>
    </Form>
    //   </div>
    // </div>
  );
};

export default Otp;
