"use Client";
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

import axiosService from "@/lib/services/axiosService";
import { contSchema } from "@/lib/zod-schema/contSchema";
import { contType } from "@/lib/zod-type/contType";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Investor } from "@/lib/data/mocked";
import { addContact } from "@/lib/actions/investorActions";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  selectedItem?: Investor;
}
const AddContact: React.FC<Props> = ({ selectedItem }) => {
  const router = useRouter();
  const form = useForm<contType>({
    resolver: zodResolver(contSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      title: "",
    },
  });

  const onSubmit = async (data: contType) => {
    try {
      const investorId = selectedItem?._id;

      if (!investorId) {
        throw new Error("Investor ID is missing");
      }

      // Use axios directly to post data
      await axios.post(`/api/investors/${investorId}/contact`, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        title: data.title,
      });

      // Refresh the data or reload the page
      router.refresh();
      console.log("Contact added successfully"); // Handle success message
    } catch (error: any) {
      console.error(error.message); // Handle error
    }
  };

  return (
    <DialogContent className="max-h-[550px] text-sm  w-[600px] my-3 overflow-auto no-scrollbar">
      <Form {...form}>
        <div className="    space-y-6 flex flex-col items-centr w-full">
          <div className="w-full flex flex-col items-center  justify-center">
            <p className="font-bold text-xl">New Contact</p>
            <p className="font-normal">
              Fill in the fields below in order to add a new contact
            </p>
          </div>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="   items-center flex flex-col h-full "
          >
            <div className="space-y-4 w-full">
              <div className="w-full  flex gap-x-4 items-center">
                <div className="w-1/2 space-y-2">
                  <FormLabel className="text-sm font-normal">
                    First Name
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
                <div className="w-1/2">
                  <div className="w-full space-y-2">
                    <FormLabel className="font-normal text-sm">
                      Last Name
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
                <div className="w-full grid grid-cols-2 my-3">
                  <div className=" col-span-1">
                    <p>Primary Contact</p>
                  </div>
                  <div className=" col-span-1">
                    <p>Secondary Contact</p>
                  </div>
                </div>
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
    </DialogContent>
  );
};

export default AddContact;
