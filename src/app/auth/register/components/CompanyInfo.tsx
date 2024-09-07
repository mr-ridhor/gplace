"use client";

import { Selects } from "@/components/Selects";
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
import { MoveRight } from "lucide-react";
import React from "react";
import { personalSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Import useRouter
import { companyType } from "@/lib/zod-type/companyType";
import { companySchema } from "@/lib/zod-schema/companySchema";
import { YearSelect } from "@/components/YearSelect";

interface CompanyInfoProps {
  companyInfo: companyType;
  setCompanyInfo: React.Dispatch<React.SetStateAction<companyType>>;
  onNext: () => void;
}
const CompanyInfo: React.FC<CompanyInfoProps> = ({
  companyInfo,
  setCompanyInfo,
  onNext,
}) => {
  const router = useRouter(); // Initialize router
  // const form = useForm<companyType>({
  //   resolver: zodResolver(companySchema),
  //   defaultValues: {
  //     email: "",
  //     companyName: "",
  //     country: "",
  //     prevEbitda: "",
  //     profit: "",
  //     prevProfit: "",
  //     prevRevenue: "",
  //     revenue: "",
  //     foundingYear: "",
  //     industry: "",
  //     website: "",
  //     ebitda: "",
  //     city: "",
  //   },
  // });

  // const onSubmit = (data: companyType) => {
  //   console.log(data);
  //   // Navigate to the company-info step
  //   router.push("/auth/register?step=team-info");
  // };
  const form = useForm<companyType>({
    resolver: zodResolver(companySchema),
    defaultValues: companyInfo,
  });

  const onSubmit = (data: companyType) => {
    setCompanyInfo(data);
    onNext();
    router.push("/auth/register?step=team-info");
  };
  return (
    <Form {...form}>
      <div className=" h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
        <div className="w-[90%] md:w-[85%] lg:w-[55%] xl:w-[500px] items-center flex flex-col mt-10  ">
          <div className="w-full">
            <strong className="text-sm xl:text-2xl text-left ">
              Company Information
            </strong>
            <p className="font-light text-sm xl:text-lg">
              Please fill in the required fields to let us know more about your
              company.
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[90%] md:w-[80%] lg:w-[55%] xl:w-[500px]  items-center flex flex-col h-full "
        >
          <div className="space-y-4 w-full">
            <div className="w-full space-y-2">
              <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                Company Name
              </FormLabel>
              <FormField
                control={form.control}
                name="name"
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
              <div className="w-1/2 space-y-2">
                <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                  Country
                </FormLabel>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Selects
                          value={field.value}
                          onChange={field.onChange}
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
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
                <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                  City
                </FormLabel>

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Selects
                          value={field.value}
                          onChange={field.onChange}
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
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
              <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                Company Email
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
            <div className="w-full space-y-2">
              <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                Website
              </FormLabel>
              <FormField
                control={form.control}
                name="website"
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
            <div className="w-full space-y-2">
              <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                Industry
              </FormLabel>
              <FormField
                control={form.control}
                name="industry"
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
              <div className="w-1/2 space-y-2">
                <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                  Founding Year
                </FormLabel>
                <FormField
                  control={form.control}
                  name="foundingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <YearSelect
                          value={field.value}
                          onChange={field.onChange}
                          className="focus:border-0 focus-visible:ring-[#04acc2] text-[10px] md:text-sm lg:text-base"
                          placeholder="Select Year"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 space-y-2">
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                    Revenue (LTM, $K)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="revenue.ltm"
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
            </div>
            <div className="w-full  flex gap-x-4">
              <div className="w-1/2 space-y-2">
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                    Revenue (Previous year, $K)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="revenue.previousYear"
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
              <div className="w-1/2 space-y-2">
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                    Gross profit(LTM, $K)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="grossProfit.ltm"
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
            </div>
            <div className="w-full  flex gap-x-4">
              <div className="w-1/2 space-y-2">
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                    Gross profit (Previous year, $K)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="grossProfit.previousYear"
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
              <div className="w-1/2 space-y-2">
                <div className="w-full space-y-2">
                  <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                    EBITDA
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="EBITDA.ltm"
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
            </div>
            <div className="w-full flex items-center gap-x-4">
              {/* Input Field Container */}
              <div className="w-1/2 flex flex-col space-y-2">
                <FormLabel className="font-normal text-[10px] md:text-sm lg:text-base">
                  EBITDA (Previous year, $K)
                </FormLabel>
                <FormField
                  control={form.control}
                  name="EBITDA.previousYear"
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

              {/* Button Container */}
              <div className="w-1/2 flex items-center justify-center">
                <Button
                  className="w-full h-10 mt-6 xl:mt-7 rounded-md flex items-center justify-center"
                  type="submit"
                >
                  <p className="text-white font-bold">Next</p>
                  <MoveRight color="white" className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Form>
    //   </div>
    // </div>
  );
};

export default CompanyInfo;
