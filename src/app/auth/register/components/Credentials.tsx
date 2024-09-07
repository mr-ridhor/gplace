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

import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { authType } from "@/lib/zod-type/authType";
import { authSchema } from "@/lib/zod-schema/authSchema";

interface CredentialsProps {
  credentials: authType;
  setCredentials: React.Dispatch<React.SetStateAction<authType>>;
  // onNext: () => void;
  // onPrevious: () => void;
  submit: () => void;
}
const Credentials: React.FC<CredentialsProps> = ({
  credentials,
  setCredentials,

  submit,
}) => {
  const router = useRouter();
  // const form = useForm<authType>({
  //   resolver: zodResolver(authSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     confirmPass: "",
  //   },
  // });

  // const onSubmit = (data: authType) => {
  //   console.log(data);
  //   alert("HI");
  //   // Navigate to the company-info step
  //   router.push("/auth/register?step=otp");
  // };
  const form = useForm<authType>({
    resolver: zodResolver(authSchema),
    defaultValues: credentials,
  });
  useEffect(() => {
    const subscription = form.watch((data: any) => {
      return setCredentials(data);
    });
    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, [form.watch, setCredentials]);
  // const onSubmit = (data: authType) => {
  //   console.log("cred", data);
  //   setCredentials(data);
  //   // onNext();
  //   submit();
  // };
  const onSubmit = async (data: authType) => {
    console.log("cred", data);

    // Update credentials and then proceed with submission
    setCredentials(data);

    // Wait for state to update and then call submit
    setTimeout(() => {
      submit();
    }, 0);
    router.push("login");
  };

  return (
    <Form {...form}>
      <div className=" h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
        <div className="w-[90%] md:w-[85%] lg:w-[55%] xl:w-[500px] items-center flex flex-col mt-10  ">
          <div className="w-full">
            <strong className="text-sm xl:text-2xl text-left ">
              Log in credentials
            </strong>
            <p className="font-light text-sm xl:text-lg">
              Enter your team log in email and password to complete sign up
              process.
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[90%] md:w-[80%] lg:w-[55%] xl:w-[500px]  items-center flex flex-col h-full "
        >
          <div className="space-y-5 w-full">
            <div className="space-y-4">
              <div className="w-full space-y-2">
                <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                  Email
                </FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full  flex gap-x-4">
                <div className="w-full space-y-2">
                  <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                    Password
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                  Confirm Password
                </FormLabel>
                <FormField
                  control={form.control}
                  name="confirmPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
      </div>
    </Form>
    //   </div>
    // </div>
  );
};

export default Credentials;
