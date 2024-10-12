"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddContact from "./AddContact";
import { Investor } from "@/lib/data/mocked";

interface Props {
  selectedItem?: Investor;
}

const ContactHeader: React.FC<Props> = ({ selectedItem }) => {
  // State to control dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle closing the dialog
  const handleClose = () => setIsDialogOpen(false);

  return (
    <div className="w-full flex items-center gap-x-4 justify-between">
      <div className="">
        <p>Contact</p>
      </div>
      <div className="flex items-center gap-x-3 h-8">
        <div className="border rounded-full flex w-[120px] p-1 md:px-2 px-2 h-full ">
          <input
            type="text"
            className="border-none focus-visible:border-0 md:px-1 m-1 w-[90%] focus-visible:ring-0 focus:outline-none text-sm"
            placeholder="Search"
          />
        </div>
        <div className="h-full">
          <Button className="text-white h-full flex gap-x-1 items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger
                className="flex gap-x-2 text-sm items-center"
                onClick={() => setIsDialogOpen(true)}
              >
                <FaPlus />
                Add New
              </DialogTrigger>
              <AddContact onClose={handleClose} selectedItem={selectedItem} />
            </Dialog>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
