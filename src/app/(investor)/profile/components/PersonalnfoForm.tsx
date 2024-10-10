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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { bio } = useSelector(getProfile);

  useEffect(() => {
    form.reset(bio);
  }, [bio]);

  const form = useForm<personalType>({
    resolver: zodResolver(personalSchema),
    defaultValues: bio,
  });

  const onSubmit = async (data: personalType) => {
    // console.log(data);

    // Send a PUT request to the API
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Profile updated successfully:", result);

        // Dispatch the updated info to the Redux store
        dispatch(updatePersonalInfo(data));
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <DialogContent className="h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar">
      <div className="py-4">
        <Form {...form}>
          <div className="px-2 text-sm space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
            <div className="w-full items-center flex flex-col">
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
              className="w-full items-center flex flex-col h-full"
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
                              className="focus:border-0 focus-visible:ring-[#04acc2]"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e); // React Hook Form handler
                                // console.log(e.target.value); // Log value on change
                              }}
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
                              onChange={(e) => {
                                field.onChange(e);
                                // console.log(e.target.value);
                              }}
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
                            onChange={(e) => {
                              field.onChange(e);
                              // console.log(e.target.value);
                            }}
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
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(e.target.value);
                            }}
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
                            onChange={(e) => {
                              field.onChange(e);
                              // console.log(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-x-4">
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
                              onChange={(e) => {
                                field.onChange(e);
                                console.log(e.target.value);
                              }}
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
                              onChange={(e) => {
                                field.onChange(e);
                                console.log(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Other fields continue here */}

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
                            onChange={(e) => {
                              field.onChange(e);
                              console.log(e.target.value);
                            }}
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
                  className="w-full h-12 mt-3 gap-x-1 rounded-md"
                  type="submit"
                  disabled={form.formState.isSubmitting} // Disable button on submit
                >
                  <p className="text-white font-bold">
                    {form.formState.isSubmitting ? "Saving..." : "Done"}
                  </p>
                </Button>
                {/* Edit button to enable/disable inputs */}
              </div>
            </form>
          </div>
        </Form>
      </div>
    </DialogContent>
  );
};

export default PersonalInfoForm;
