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
import { getInvestor, setTarget } from "@/lib/slice/addInvestorSlice";
import { invpro2Schema } from "@/lib/zod-schema/invpro2Schema";
import { targetSchema } from "@/lib/zod-schema/targetSchema";

import { invpro2Type } from "@/lib/zod-type/invpro2Type";
import { tragetType } from "@/lib/zod-type/targetType";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  handleClick: () => void;
}

const Target: React.FC<Props> = ({ handleClick }) => {
  const dispatch = useDispatch();
  const target = useSelector(getInvestor);
  const form = useForm<tragetType>({
    resolver: zodResolver(targetSchema),
    mode: "onChange",
    defaultValues: target,
  });
  const onSubmit = (data: tragetType) => {
    console.log(data);
    dispatch(setTarget(data));

    handleClick();
  };
  return (
    <TabsContent value="target">
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
                  Revenue ($K0)
                </FormLabel>
                <FormField
                  control={form.control}
                  name="rev"
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
                <FormLabel className="font-normal text-sm">EBITDA</FormLabel>
                <FormField
                  control={form.control}
                  name="ebdt"
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
                <FormLabel className="font-normal text-sm">Deal size</FormLabel>
                <FormField
                  control={form.control}
                  name="dealsz"
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
                  disabled={!form.formState.isValid}
                  className={`w-full h-10 mt-3 rounded-md flex items-center justify-center
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

export default Target;
