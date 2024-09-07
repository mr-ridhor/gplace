import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { TiArrowRight } from "react-icons/ti";

const Notes = () => {
  return (
    <TabsContent value="notes" className="w-full  mt-4 ">
      {" "}
      <div className="space-y-3">
        <div className="border border-black space-y-3 h-[180px] rounded-md w-full p-2">
          <div className=" border-b h-10">
            <Input
              className="border-0  focus-visible:ring-0 w-[90%] h-8  appearance-none focus-visible:ring-offset-0"
              placeholder="Note title"
            />
          </div>
          <div className=" h-[45%]">
            <Textarea
              className="border-0 h-full resize-none focus-visible:ring-0 w-  appearance-none focus-visible:ring-offset-0"
              placeholder="Enter to type your note body"
            />
            <div className="flex justify-end w-full">
              <Button className="bg-[#DCF8FC] hover:bg-[#DCF8FC]/70 flex gap-x-1 h-8 items-center">
                <p>Save</p>
                <TiArrowRight />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-[10px] lg:text-sm space-y-4">
          <p>All your notes</p>
          <div className="border w-full rounded-md p-3 text-[10px] lg:text-sm">
            <div className="space-y-3 border-b py-2">
              <div className="flex gap-x-2 h-fit items-center">
                <div className="rounded-full h-6 w-6 bg-gray-300"></div>
                <p>Saint Garling</p>
              </div>
              <p>Send Email reminder</p>
            </div>
            <div className="w-full space-y-4 my-4">
              <p>
                Send an email to Capital Ltd. asking for data and also mention
                the importance of quick response
              </p>
              <div className="flex w-full justify-end">
                <Button className="bg-transparent hover:bg-transparent text-red-700 flex gap-x-1 h-8 items-center">
                  <p>Delete</p>
                  <BiTrash />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default Notes;
