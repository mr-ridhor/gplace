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
import React, { useState, useEffect } from "react";
import { personalSchema } from "@/lib/zod-schema/personalSchema";
import { personalType } from "@/lib/zod-type/personalType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getRegister, setPersonalInfo } from "@/lib/slice/registerSlice";
import { Country, City, ICity } from "country-state-city";
interface PersonalInfoProps {
  onNext: () => void;
}
const PersonalInfo: React.FC<PersonalInfoProps> = ({ onNext }) => {
  const countryList = Country.getAllCountries();
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
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

  const router = useRouter(); // Initialize router
  const dispatch = useDispatch();
  const personalInfo = useSelector(getRegister);

  const form = useForm<personalType>({
    mode: "onChange",
    resolver: zodResolver(personalSchema),
    defaultValues: personalInfo,
  });

  const onSubmit = (data: personalType) => {
    // setPersonalInfo(data);
    console.log(data);
    dispatch(setPersonalInfo(data));
    onNext();
    router.push("/auth/register?step=company-info");
  };
  return (
    <Form {...form}>
      <div className=" h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
        <div className="w-[55%] xl:w-[500px] items-center flex flex-col mt-10  ">
          <div className="w-full">
            <strong className="text-sm xl:text-2xl text-left ">
              Personal Information
            </strong>
            <p className="font-light text-sm xl:text-lg">
              Complete your sign up process and get started with a 1 month free
              trial
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[55%] xl:w-[500px]  items-center flex flex-col h-full "
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
            {/* <div className="w-full  flex gap-x-4">
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
            </div> */}
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
                <FormLabel className="font-normal">City</FormLabel>
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
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="w-[50%] h-10 mt-3   gap-x-1 rounded-md "
              type="submit"
            >
              <p
                className={`${
                  !form.formState.isValid ? "" : "text-white"
                } font-bold`}
              >
                Next
              </p>
              <p className="text-white font-bold"></p>
              <MoveRight
                color={`${!form.formState.isValid ? "#B3B3B3" : "white"}`}
              />
              {/* )} */}
            </Button>
          </div>
        </form>
      </div>
    </Form>
    //   </div>
    // </div>
  );
};

export default PersonalInfo;
