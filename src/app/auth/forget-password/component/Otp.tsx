"use client";

import LoaderComponent from "@/components/LoaderComponent";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { pinSchema } from "@/lib/zod-schema/pinSchema";
import { pinType } from "@/lib/zod-type/pinType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface OtpProps {
  onSubmit: (data: pinType) => void;
}

const Otp: React.FC<OtpProps> = ({ onSubmit }) => {
  const form = useForm<pinType>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full text-center">
          <p className="font-bold">Forgot Password</p>
          <p className="font-normal">
            Check your email for a 5 digits OTP , input them in the field below
            and reset your password
          </p>
        </div>
        <div className="space-y-4 mt-3">
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
          <Button className="w-full text-white" type="submit">
            {/* Submit OTP */}
            {form.formState.isSubmitting ? (
              <div className="w-8 h-8">
                <LoaderComponent className="text-white" />
              </div>
            ) : (
              // <p className="text-black font-bold">Sign in1</p>
              <p className="text-white font-bold">Submit OTP </p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Otp;
