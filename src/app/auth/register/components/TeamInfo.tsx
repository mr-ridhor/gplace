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
import { MoveRight } from "lucide-react";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { teamType } from "@/lib/zod-type/teamType";
import { teamSchema } from "@/lib/zod-schema/teamSchema";

interface TeamInfoProps {
  teamInfo: teamType;
  setTeamInfo: React.Dispatch<React.SetStateAction<teamType>>;
  onNext: () => void;
}
const TeamInfo: React.FC<TeamInfoProps> = ({
  teamInfo,
  setTeamInfo,
  onNext,
}) => {
  const router = useRouter();
  // const form = useForm<teamType>({
  //   resolver: zodResolver(teamSchema),
  //   defaultValues: {
  //     fullName: "",
  //     role: "",
  //     fullName2: "",
  //     role2: "",
  //   },
  // });
  const form = useForm<teamType>({
    resolver: zodResolver(teamSchema),
    defaultValues: teamInfo,
  });

  const onSubmit = (data: teamType) => {
    setTeamInfo(data);
    onNext();
    router.push("/auth/register?step=set-credentials");
  };

  // const onSubmit = (data: teamType) => {
  //   console.log(data);
  //   // Navigate to the company-info step
  //   router.push("/auth/register?step=set-credentials");
  // };
  return (
    <Form {...form}>
      <div className=" h-[70%]   space-y-6 overflow-y-auto no-scrollbar flex flex-col items-center w-full">
        <div className="w-[90%] md:w-[85%] lg:w-[55%] xl:w-[500px] items-center flex flex-col mt-10  ">
          <div className="w-full">
            <strong className="text-sm xl:text-2xl text-left ">
              Team Information (Optional)
            </strong>
            <p className="font-light text-sm xl:text-lg">
              Kindly complete the necessary fields to inform us about your team
              (2 users only).
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[90%] md:w-[80%] lg:w-[55%] xl:w-[500px]  items-center flex flex-col h-full "
        >
          <div className="space-y-5 w-full">
            <div className="space-y-4">
              <div className="w-full justify-end flex">
                <p className="text-[10px] md:text-sm lg:text-base font-normal">
                  Team member 1
                </p>
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                  Full Name
                </FormLabel>
                <FormField
                  control={form.control}
                  name="team1.fullName"
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
                <div className="w-full space-y-2">
                  <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                    Role
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="team1.role"
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
            <div className="space-y-4">
              <div className="w-full justify-end flex">
                <p className="text-[10px] md:text-sm lg:text-base font-normal">
                  Team member 2
                </p>
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                  Full Name
                </FormLabel>
                <FormField
                  control={form.control}
                  name="team2.fullName"
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
                <div className="w-full space-y-2">
                  <FormLabel className="text-[10px] md:text-sm lg:text-base font-normal">
                    Role
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="team2.role"
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
              {/* Button Container */}
              <div className="w-1/2 flex items-center justify-center">
                <Button
                  className="w-full h-10 mt-3 rounded-md flex items-center justify-center"
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

export default TeamInfo;
