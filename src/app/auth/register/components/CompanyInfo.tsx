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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyType } from "@/lib/zod-type/companyType";
import { companySchema } from "@/lib/zod-schema/companySchema";
import { YearSelect } from "@/components/YearSelect";
import { useDispatch, useSelector } from "react-redux";
import { getRegister, setCompanyInfo } from "@/lib/slice/registerSlice";
import { Country, City, ICity } from "country-state-city";
interface CompanyInfoProps {
  onNext: () => void;
}
const CompanyInfo: React.FC<CompanyInfoProps> = ({ onNext }) => {
  const countryList = Country.getAllCountries();
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const companyInfo = useSelector(getRegister);
  const form = useForm<companyType>({
    resolver: zodResolver(companySchema),
    defaultValues: companyInfo,
  });
  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName);
    // Find the country by name to get the correct ISO code
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.name === countryName
    );
    if (selectedCountry) {
      const cities = City.getCitiesOfCountry(selectedCountry.isoCode) || [];
      setCityList(cities);
    } else {
      setCityList([]); // Clear cities if no country found
    }
  };

  const onSubmit = (data: companyType) => {
    dispatch(setCompanyInfo(data));

    console.log("this", data);

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
                          onChange={(value) => {
                            field.onChange(value);
                            handleCountryChange(value); // Pass the country name to handleCountryChange
                          }}
                          className="focus:border-0 focus-visible:ring-[#04acc2]"
                          placeholder="Select a country"
                          options={countryList.map((country) => ({
                            value: country.name, // Use country.name as the value
                            label: country.name,
                          }))}
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
                          onChange={field.onChange} // Pass the city name to form control
                          className="focus:border-0 focus-visible:ring-[#04acc2]"
                          placeholder="Select a city"
                          options={cityList.map((city) => ({
                            value: city.name, // Use city.name as the value
                            label: city.name,
                          }))}
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
  );
};

export default CompanyInfo;
