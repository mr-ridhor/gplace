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
import { useDispatch, useSelector } from "react-redux";
// import { getRegister, setCredentials } from "@/lib/slice/registerSlice";
// import axiosService from "@/lib/services/axiosService";
import axios from "axios";
import { getRegister, setCredentials, reset } from "@/lib/slice/registerSlice";
import LoaderComponent from "@/components/LoaderComponent";
import { toast } from "sonner";
import moment from "moment";
import { MoveLeft } from "lucide-react";
import { numeralFormatter } from "@/lib/numeralFormatter";

interface CredentialsProps {
  onNext: () => void;
  onBack: () => void;
}
const Credentials: React.FC<CredentialsProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { credentials, personalInfo, companyInfo, teamInfo } =
    useSelector(getRegister);

  const form = useForm<authType>({
    resolver: zodResolver(authSchema),
    // defaultValues: credentials,
    defaultValues: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  const onSubmit = async (data: authType) => {
    dispatch(setCredentials(data));

    const cleanedData = {
      ...companyInfo,
      revenue: {
        ltm: numeralFormatter(companyInfo.revenue.ltm),
        previousYear: numeralFormatter(companyInfo.revenue.previousYear),
      },
      grossProfit: {
        ltm: numeralFormatter(companyInfo.grossProfit.ltm),
        previousYear: numeralFormatter(companyInfo.grossProfit.previousYear),
      },
      EBITDA: {
        ltm: numeralFormatter(companyInfo.EBITDA.ltm),
        previousYear: numeralFormatter(companyInfo.EBITDA.previousYear),
      },
    };
    const payload = {
      bio: personalInfo,
      company: cleanedData,
      team: teamInfo,
      credentials: data,
    };
    console.log("cred", payload);
    try {
      const response = await axios.post(`/api/signup`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res", response);

      if (response.status === 201) {
        // const load = {
        //   email: data.email,
        // };
        // // router.push("login");
        // // console.log(load);
        // const verificationResponse = await axios.post(
        //   `/api/email/otp`,
        //   load,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        // console.log("otp", verificationResponse);
        // if (verificationResponse.status === 200) {
        toast(response.data.message, {
          description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
        });
        onNext();
        router.push(`/auth/register?step=otp`);
        reset();
        // }
      }

      if (response.status !== 201) {
        throw new Error("Failed to submit the data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast("All fields must be filled", {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
    }
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
                type="button"
                onClick={onBack}
                className="w-1/2 h-10    gap-x-1 rounded-md "
              >
                <MoveLeft color={`${"white"}`} />
                <p className={`${"text-white"} font-bold`}>Back</p>

                {/* )} */}
              </Button>
              <Button
                disabled={!form.formState.isValid}
                className={`w-1/2 h-10 rounded-md flex items-center justify-center
                        `}
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <div className="w-8 h-8">
                    <LoaderComponent className="text-white" />
                  </div>
                ) : (
                  <p
                    className={`${
                      !form.formState.isValid ? "" : "text-white"
                    } font-bold`}
                  >
                    Complete
                  </p>
                )}
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
