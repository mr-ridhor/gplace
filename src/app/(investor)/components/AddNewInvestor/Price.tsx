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
import { getInvestor, setPrice } from "@/lib/slice/addInvestorSlice";
import { priceSchema } from "@/lib/zod-schema/priceSchema";
import { priceType } from "@/lib/zod-type/priceType";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  handleClick: () => void;
  // price: priceType;
  // setPri: React.Dispatch<React.SetStateAction<priceType>>;
}

const Price: React.FC<Props> = ({ handleClick }) => {
  const dispatch = useDispatch();
  const price = useSelector(getInvestor);
  const form = useForm<priceType>({
    resolver: zodResolver(priceSchema),
    defaultValues: price,
  });

  const onSubmit = (data: priceType) => {
    // alert("HI");
    console.log(data);
    dispatch(setPrice(data));
    // setPri(data);
    handleClick();
  };
  return (
    <TabsContent value="price">
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
                  Valuation ($K)
                </FormLabel>
                <FormField
                  control={form.control}
                  name="val"
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
                  EV/Revenue
                </FormLabel>
                <FormField
                  control={form.control}
                  name="evRev"
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
                <FormLabel className="font-normal text-sm">EV/EBITDA</FormLabel>
                <FormField
                  control={form.control}
                  name="evEbd"
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

export default Price;
