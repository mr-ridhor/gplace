"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contSchema } from "@/lib/zod-schema/contSchema";
import { contType } from "@/lib/zod-type/contType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Investor } from "@/lib/data/mocked";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LuLoader } from "react-icons/lu";
import moment from "moment";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "@/lib/slice/contactSlice";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  selectedItem?: Investor;
  onClose: () => void; // Pass the onClose prop
}

const AddContact: React.FC<Props> = ({ selectedItem, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [contactType, setContactType] = useState("Primary");
  const form = useForm<contType>({
    resolver: zodResolver(contSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      title: "",
      contactType: "Primary",
    },
  });

  const fetchData = async () => {
    dispatch(fetchDataStart());
    try {
      const response = await axios.get(
        `/api/investors/${selectedItem?._id}/contact`
      );
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message || "No contact found"));
    }
  };

  const onSubmit = async (data: contType) => {
    const payload = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      title: data.title,
      contactType: contactType,
    };
    console.log("[ayload", payload);

    try {
      const investorId = selectedItem?._id;
      if (!investorId) {
        throw new Error("Investor ID is missing");
      }

      await axios.post(`/api/investors/${investorId}/contact`, payload);
      fetchData();
      form.reset();
      setTimeout(() => {
        onClose();
      }, 2000);
      toast("Contact added successfully", {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
    } catch (error: any) {
      console.error(error.message);
      toast("All fields must be filled", {
        description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
      });
    }
  };

  return (
    <DialogContent className="max-h-[550px] text-sm w-[320px] md:w-[600px] my-3 overflow-auto no-scrollbar">
      <Form {...form}>
        <div className="space-y-6 flex flex-col items-center w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <p className="font-bold text-xl">New Contact</p>
            <p className="font-normal">
              Fill in the fields below in order to add a new contact
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="items-center flex flex-col h-full"
          >
            <div className="space-y-4 w-full">
              <div className="w-full flex gap-x-4 items-center">
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
                <div className="w-full grid grid-cols-2 my-3 ">
                  <div className=" col-span-1 px-3">
                    <Button
                      type="button"
                      className={`w-full ${
                        contactType === "Primary"
                          ? "bg-[#DDE9EB] hover:bg-[#DDE9EB]/70 "
                          : "bg-transparent hover:bg-transparent text-black"
                      }`}
                      onClick={() => setContactType("Primary")}
                    >
                      <p>Primary Contact</p>
                    </Button>
                  </div>
                  <div className=" col-span-1 px-3">
                    <Button
                      className={`w-full ${
                        contactType === "Secondary"
                          ? "bg-[#DDE9EB] hover:bg-[#DDE9EB]/70 "
                          : "bg-transparent hover:bg-transparent text-black"
                      }`}
                      onClick={() => setContactType("Secondary")}
                      type="button"
                    >
                      <p>Secondary Contact</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full space-y-2">
                <FormLabel className="font-normal text-sm">Email</FormLabel>
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
                  Phone number
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

              <DialogFooter>
                <div className="w-full flex items-center gap-x-4">
                  <Button
                    disabled={!form.formState.isValid}
                    className={`w-full h-10 mt-3 rounded-md flex items-center justify-center`}
                    type="submit"
                  >
                    {form.formState.isSubmitting ? (
                      <div className="w-full h-72 flex items-center justify-center">
                        <LuLoader className="w-8 h-8 animate-spin text-white" />
                      </div>
                    ) : (
                      <p
                        className={`${
                          !form.formState.isValid ? "" : "text-white"
                        } font-bold`}
                      >
                        Done!
                      </p>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </form>
        </div>
      </Form>
    </DialogContent>
  );
};

export default AddContact;
