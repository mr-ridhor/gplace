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
import { invproSchema } from "@/lib/zod-schema/invproSchema";
import { invproType } from "@/lib/zod-type/invproType";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onNext: () => void;
  setPro: React.Dispatch<React.SetStateAction<invproType>>;
  profile: invproType;
}
const ProfileInfo: React.FC<Props> = ({ profile, setPro, onNext }) => {
  const form = useForm<invproType>({
    resolver: zodResolver(invproSchema),
    defaultValues: profile,
  });
  const onSubmit = (data: invproType) => {
    console.log(data);
    setPro(data);
    alert("hi");
    onNext();
  };
  return (
    <TabsContent value="profile">
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
                  Investment industry
                </FormLabel>
                <FormField
                  control={form.control}
                  name="invInd"
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
                  Investment geographies
                </FormLabel>
                <FormField
                  control={form.control}
                  name="invGeo"
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
                  # of deals in LTM
                </FormLabel>
                <FormField
                  control={form.control}
                  name="noLTM"
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
                  // onClick={handleClick}
                  className="w-full h-10  rounded-md flex items-center justify-center"
                  type="submit"
                >
                  <p className="text-white font-bold">Next</p>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </TabsContent>
  );
};

export default ProfileInfo;
