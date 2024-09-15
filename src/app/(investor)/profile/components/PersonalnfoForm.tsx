"use client";
import { Selects } from "@/components/Selects";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
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
  getProfile,
  setProfile,
  updatePersonalInfo,
} from "@/lib/slice/profileSlice";
import { personalSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PersonalnfoForm = () => {
  const dispatch = useDispatch();
  const { bio } = useSelector(getProfile);
  useEffect(() => {
    form.reset(bio);
  }, [bio]);
  const form = useForm<personalType>({
    resolver: zodResolver(personalSchema),
    defaultValues: bio,
  });

  const onSubmit = (data: personalType) => {
    console.log(data);
    dispatch(updatePersonalInfo(data));

    // Navigate to the company-info step
    // router.push("/auth/register?step=company-info");
  };
  console.log(bio);
  return (
    <DialogContent className="h-fit  max-h-[550px] w-[600px] my-3 overflow-auto no-scrollbar">
      <div className="py-4">
        <Form {...form}>
          <div className="px-2 text-sm   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
            <div className="w-full items-center flex flex-col  ">
              <div className="w-full">
                <strong className="text-sm xl:text-2xl text-left ">
                  Personal Information
                </strong>
                <p className="font-light text-sm xl:text-lg">
                  Complete your sign up process and get started with a 1 month
                  free trial
                </p>
              </div>
            </div>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full items-center flex flex-col h-full "
            >
              <div className="space-y-4 w-full">
                <div className="w-full  flex gap-x-4">
                  <div className="w-1/2 space-y-2">
                    <FormLabel className="font-normal">First Name</FormLabel>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              // value={bio?.firstName}
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <FormLabel className="font-normal">Last Name</FormLabel>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
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
                  <FormLabel className="font-normal">Title</FormLabel>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal">Email Address</FormLabel>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal">Phone</FormLabel>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full gap-x-4 flex items-center">
                  <div className="w-1/2">
                    <FormLabel className="font-normal">LinkedIn</FormLabel>
                    <FormField
                      control={form.control}
                      name="linkedIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormLabel className="font-normal">X</FormLabel>
                    <FormField
                      control={form.control}
                      name="x"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full  flex gap-x-4">
                  <div className="w-1/2 space-y-2">
                    <FormLabel className="font-normal">Country</FormLabel>

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Selects
                              value={field.value}
                              onChange={field.onChange}
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              placeholder="Ireland"
                              options={[
                                { value: "fr", label: "Fr" },
                                { value: "eng", label: "Eng" },
                              ]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <FormLabel className="font-normal">City</FormLabel>

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Selects
                              value={field.value}
                              onChange={field.onChange}
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              placeholder="Ireland"
                              options={[
                                { value: "s", label: "Fr" },
                                { value: "s4", label: "eng" },
                              ]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal">Address</FormLabel>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <Button
                  // onClick={nextForm}
                  className="w-full h-12 mt-3   gap-x-1 rounded-md "
                  type="submit"
                >
                  {/* {form.formState.isSubmitting ? (
                        <div className="w-8 h-8">
                          <LoaderComponent />
                        </div>
                      ) : ( */}
                  <p className="text-white font-bold">Done</p>

                  {/* )} */}
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </DialogContent>
  );
};

export default PersonalnfoForm;
