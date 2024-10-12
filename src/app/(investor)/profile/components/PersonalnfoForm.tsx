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
import { toast } from "@/components/ui/use-toast";
import {
  Bio,
  getProfile,
  setProfile,
  updatePersonalInfo,
} from "@/lib/slice/profileSlice";
import { personalSchema, bioSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import moment from "moment";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { bio } = useSelector(getProfile);

  const form = useForm<Bio>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      firstName: bio.firstName,
      lastName: bio.lastName,
      title: bio.title,
      city: bio.city,
      country: bio.country,
      email: bio.email,
      phone: bio.phone,
      linkedIn: bio.linkedIn,
      x: bio.x,
      address: bio.address,
    },
  });

  const onSubmit = async (data: Bio) => {
    console.log(data);
    dispatch(updatePersonalInfo(data));

    try {
      const response = await axios.put("/api/profile", data);
      console.log(response);
      dispatch(updatePersonalInfo(data));

      if (response.status === 200) {
        const result = response.data;
        // Handle success
        toast({
          title: `${result.message}`,
          description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
        });
      }
    } catch (error: any) {
      toast({
        title: `${error.data.message}`,
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <DialogContent className="h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar">
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormLabel className="forn-normal">Email Address</FormLabel>
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
              <div className="w-full flex gap-x-4">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal">LinkedIn</FormLabel>
                  <FormField
                    control={form.control}
                    name="linkedIn"
                    render={(field) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <FormLabel>X</FormLabel>
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
              <div className="w-full flex items-center gap-x-4">
                <div className="w-1/2 space-y-2">
                  <FormLabel>Country</FormLabel>
                  <FormField
                    control={form.control}
                    name="country"
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
                <div className="w-1/2 space-y-2">
                  <FormLabel>City</FormLabel>
                  <FormField
                    control={form.control}
                    name="city"
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
                // onClick={() => alert("Button clicked")}
                className="w-full h-10 mt-3   gap-x-1 rounded-md "
                type="submit"
              >
                <p className={`${"text-white"} font-bold`}>Done!</p>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default PersonalInfoForm;
