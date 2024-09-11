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
import { TabsContent } from "@/components/ui/tabs";
import axiosService from "@/lib/services/axiosService";
import { getInvestor, setContact } from "@/lib/slice/addInvestorSlice";
import { contSchema } from "@/lib/zod-schema/contSchema";
import { contType } from "@/lib/zod-type/contType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  // const router = useRouter;
  const { data: session } = useSession();
  const { contact, companyInfo, profile, profile2, target, price } =
    useSelector(getInvestor);
  const form = useForm<contType>({
    resolver: zodResolver(contSchema),
    defaultValues: contact,
  });

  const onSubmit = async (data: contType) => {
    console.log(data);
    const payload = {
      companyInfo: {
        companyName: companyInfo.name,
        country: companyInfo.country,
        city: companyInfo.city,
        website: companyInfo.website,
        yearFounded: companyInfo.yearFounded,
        employeeNumber: companyInfo.noEmp,
        investorType: companyInfo.investorType,
        description: companyInfo.description,
      },
      investmentBio: {
        industry: profile.invInd,
        geography: profile.invGeo,
        dealsInLTM: profile.noLTM,
        medianDealSize: profile2.med,
        AUM: profile2.aum,
        dealsIn5Y: profile2.deal,
      },
      targetInfo: {
        revenue: {
          from: target.rev,
          to: price.val,
        },
        EBITDA: {
          from: target.ebdt,
          to: price.evEbd,
        },
        dealSize: {
          from: target.dealsz,
          to: price.evEbd,
        },
      },
      paidInfo: {
        valuation: {
          from: 10000000, // (required)
          to: 70000000, // (required)
        },
        revenue: {
          from: 3000000, // (required)
          to: 17000000, // (required)
        },
        EBITDA: {
          from: 1200000, // (required)
          to: 6800000, // (required)
        },
      },
      primaryContact: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        title: data.title,
      },
    };
    console.log(payload);

    dispatch(setContact(data));
    try {
      const response = await axiosService.post("/investors", payload, {
        headers: {
          // Authorization: `Bearer ${session?.user.dbToken}`,
          "Content-Type": "application/json",
        },
      });

      // if (response.status !== 200) {
      //   throw new Error("Failed to submit the data");
      // }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <TabsContent value="contact">
      <Form {...form}>
        <div className="    space-y-6 flex flex-col items-centr w-full">
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="   items-center flex flex-col h-full "
          >
            <div className="space-y-4 w-full">
              <div className="w-full  flex gap-x-4 items-center">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="text-sm font-normal">Name</FormLabel>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      Surname
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2">
                <FormLabel className="font-normal text-sm">
                  Contact Email
                </FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="font-normal text-sm">
                  Contact's Phone
                </FormLabel>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="font-normal text-sm">Title</FormLabel>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center gap-x-4">
                <Button
                  className="w-full h-10  rounded-md flex items-center justify-center"
                  type="submit"
                >
                  <p className="text-white font-bold">Done!</p>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </TabsContent>
  );
};

export default Contact;
