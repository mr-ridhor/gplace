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
import { TabsContent } from "@/components/ui/tabs";
import { invcomType } from "@/lib/zod-type/invtcomType";
import { invcomSchema } from "@/lib/zod-schema/invcomSchema";
import { Textarea } from "@/components/ui/textarea";
import { getInvestor, setCompanyInfo } from "@/lib/slice/addInvestorSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  formatNumberWithCommas,
  numeralFormatter,
} from "@/lib/numeralFormatter";

interface Props {
  onNext: () => void;
  // onBack: () => void;
}
const CompanyInfom: React.FC<Props> = ({ onNext }) => {
  const dispatch = useDispatch();
  const companyInfo = useSelector(getInvestor);
  const form = useForm<invcomType>({
    resolver: zodResolver(invcomSchema),
    mode: "onChange",
    defaultValues: companyInfo,
  });

  const onSubmit = (data: invcomType) => {
    // alert("Hi");
    dispatch(setCompanyInfo(data));
    // console.log(data);

    onNext();
  };

  return (
    <TabsContent value="company">
      <Form {...form}>
        <div className="    space-y-6 flex flex-col items-centr w-full">
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="   items-center flex flex-col h-full "
          >
            <div className="space-y-4 w-full">
              <div className="w-full space-y-2">
                <FormLabel className="text-sm font-normal">
                  Company name
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

              <div className="w-full flex gap-x-4 ">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">Country</FormLabel>
                  <FormField
                    control={form.control}
                    name="country"
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
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">City</FormLabel>
                  <FormField
                    control={form.control}
                    name="city"
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
              <div className="w-full flex gap-x-4 ">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">
                    Year founded
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="yearFounded"
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
                <div className="w-1/2 space-y-2">
                  <FormLabel className="font-normal text-sm">
                    Number of employees
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="noEmp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:border-0 focus-visible:ring-[#04acc2] text-sm"
                            {...field}
                            value={formatNumberWithCommas(field.value || "")}
                            onChange={(e) =>
                              field.onChange(numeralFormatter(e.target.value))
                            }
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
                  Investor type
                </FormLabel>
                <FormField
                  control={form.control}
                  name="investorType"
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
                {/* <FormLabel className="font-normal text-sm">
                  Description
                </FormLabel>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="focus:border-0 resize-none focus-visible:ring-[#04acc2] text-sm"
                          {...field}
                          maxLength={250}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            className="focus:border-0 min-h-[100px] resize-none focus-visible:ring-[#04acc2] text-sm p0"
                            {...field}
                            maxLength={250}
                          />

                          <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                            {field.value?.length || 0}/250
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center gap-x-4">
                <Button
                  // onClick={handleClick}
                  disabled={!form.formState.isValid}
                  className={`w-full h-10   rounded-md flex items-center justify-center
                    `}
                  type="submit"
                >
                  <p
                    className={`${
                      !form.formState.isValid ? "" : "text-white"
                    } font-bold`}
                  >
                    Next
                  </p>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </TabsContent>
  );
};

export default CompanyInfom;
