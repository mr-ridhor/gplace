import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";

interface Props {
  onClose: () => void;
  isOpen: boolean; // New prop to determine if the dialog is open
}
const UpdatePlan = ({ onClose, isOpen }: Props) => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const form = useForm<planType>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
        otpCode: "",
    },
});
  const handleClose = () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  // Confirm exit
  const confirmExit = (confirm: boolean) => {
    if (confirm) {
      onClose(); // Close the form
    }
    setShowConfirmation(false); // Hide the confirmation dialog
  };
  const handleNext = () => {
    setCurrentStage(2);
  };

  // Reset to first stage (Credit Card)
  const handleReset = () => {
    setCurrentStage(1);
  };
  
  return (
    <DialogContent
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      className=" h-[450px] md:h-fit  max-h-[500px] w-[340px] md:w-[600px] my-3 overflow-auto no-scrollbar"
    >
      <div
        onClick={handleClose}
        className="flex flex-col h-8 right-1 absolute m-2 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 w-8 p-3 "
      >
        <GrClose size={24} color="black" />
      </div>
      <div className="py-4">
        <DialogHeader className=" w-full flex text-lg ">
          <strong className="text-sm xl:text-2xl text-left ">
            Credit Card Details
          </strong>
          <p className="font-light text-sm xl:text-lg">
            {" "}
            Enter credit card details for subscription to complete subscription.
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
          ></form>
        </Form>
      </div>
      {showConfirmation && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-5 rounded-md shadow-md">
            <p>Are you sure you want to exit?</p>
            <div className="w-full flex justify-center">
              <div className="flex gap-4 mt-4 w-[80%]  justify-between">
                <button
                  onClick={() => confirmExit(true)}
                  className="px-4 py-2 bg-[#04acc2] text-white  rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={() => confirmExit(false)}
                  className="px-4 py-2 bg-[#CCC]  rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default UpdatePlan;
