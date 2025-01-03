"use client";

import Logo from "@/app/svgComponent/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import moment from "moment";
import { loginType } from "@/lib/zod-type/loginType";
import { loginSchema } from "@/lib/zod-schema/loginSchema";
import LoaderComponent from "@/components/LoaderComponent";

const Login = () => {
  const searchParams = useSearchParams();
  const [remember, setRemember] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginType) => {
    try {
      console.log(remember);
      const result = await signIn("credentials", {
        ...data,
        remember,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      console.log(result);
      if (result?.ok) {
        toast("Login successful", {
          description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
        });
        // console.log(result);
        router.push(result.url ?? "/dashboard");
      } else {
        throw new Error(result?.error || "Login failed");
      }
    } catch (error: any) {
      console.log(error);
      toast(error.message, {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="sticky top-0 w-full flex-1 flex justify-end px-5 items-center h-14 z-10 text-[10px] md:text-sm lg:text-base">
        <Link href={"register"}>Not a customer? Sign up</Link>
      </div>
      <div className="h-full overflow-hidden w-full flex items-center justify-center">
        <div className="w-[300px] md:w-[450px] h-[550px] space-y-4">
          <div className="flex w-full justify-center my-4">
            <Logo />
          </div>
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full items-center flex flex-col h-full"
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
                    <div className="w-full flex gap-x-4">
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
                                {/* <Input
                                  type="password"
                                  className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                                  {...field}
                                /> */}
                                <PasswordInput
                                  field={field}
                                  className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-center gap-x-4">
                    <Button
                      disabled={!form.formState.isValid}
                      className={`w-full h-10 mt-3 rounded-md flex items-center justify-center
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
            </Form>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox
                id="remember"
                className="text-white"
                checked={remember}
                onCheckedChange={(checked: boolean) => setRemember(!!checked)}
              />
              <label
                htmlFor="remember"
                className="text-[10px] md:text-sm lg:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <div className="text-[10px] md:text-sm lg:text-base">
              <Link href={"forget-password"}>Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
