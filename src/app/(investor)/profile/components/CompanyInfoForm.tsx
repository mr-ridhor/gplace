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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { companyType } from "@/lib/zod-type/companyType";
import { companySchema } from "@/lib/zod-schema/companySchema";
import { useRouter } from "next/navigation";
import { YearSelect } from "@/components/YearSelect";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateCompanyInfo } from "@/lib/slice/profileSlice";

const CompanyInfoForm = () => {
  const router = useRouter(); // Initialize router
  const dispatch = useDispatch();
  const { company } = useSelector(getProfile);
  const form = useForm<companyType>({
    resolver: zodResolver(companySchema),
    defaultValues: company,
  });
  useEffect(() => {
    form.reset(company);
  }, [company]);
  console.log("company", company);
  const onSubmit = (data: companyType) => {
    console.log(data);
    dispatch(updateCompanyInfo(data));
    // Navigate to the company-info step
    // router.push("/auth/register?step=team-info");
  };
  return (
    <DialogContent className="h-[450px] md:h-fit  max-h-[550px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar">
      <Form {...form}>
        <div className="    space-y-6 flex flex-col items-center w-full">
          <div className="w-full items-center flex flex-col  ">
            <div className="w-full">
              <strong className="text-sm xl:text-2xl text-left ">
                Company Information
              </strong>
              <p className="font-light text-sm xl:text-lg">
                Please fill in the required fields to let us know more about
                your company.
              </p>
            </div>
          </div>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="   items-center flex flex-col h-full "
          >
            <div className="space-y-4 w-full">
              <div className="w-full space-y-2">
                <FormLabel className="text-sm font-normal">
                  Company Name
                </FormLabel>
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
              <div className="w-full  flex gap-x-4">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">Country</FormLabel>

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Selects
                            value={field.value}
                            onChange={field.onChange}
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
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
                  <FormLabel className="font-normal text-sm">City</FormLabel>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Selects
                            value={field.value}
                            onChange={field.onChange}
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
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
                <FormLabel className="font-normal text-sm">
                  Company Email
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
                <FormLabel className="font-normal text-sm">Website</FormLabel>
                <FormField
                  control={form.control}
                  name="website"
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
                <FormLabel className="font-normal text-sm">Industry</FormLabel>
                <FormField
                  control={form.control}
                  name="industry"
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
              <div className="w-full  flex gap-x-4">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">
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
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
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
                    <FormLabel className="font-normal text-sm">
                      Revenue (LTM, $K)
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="revenue.ltm"
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
              <div className="w-full  flex gap-x-4">
                <div className="w-1/2 space-y-2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      Revenue (Previous year, $K)
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="revenue.previousYear"
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
                <div className="w-1/2 space-y-2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      Gross profit(LTM, $K)
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="grossProfit.ltm"
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
              <div className="w-full  flex gap-x-4">
                <div className="w-1/2 space-y-2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      Gross profit (Previous year, $K)
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="grossProfit.previousYear"
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
                <div className="w-1/2 space-y-2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      EBITDA
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="EBITDA.ltm"
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
              <div className="w-full flex items-center gap-x-4">
                {/* Input Field Container */}
                <div className="w-1/2 flex flex-col space-y-2">
                  <FormLabel className="font-normal text-sm">
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
                    <p className="text-white font-bold">Done</p>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </DialogContent>
  );
};

export default CompanyInfoForm;
