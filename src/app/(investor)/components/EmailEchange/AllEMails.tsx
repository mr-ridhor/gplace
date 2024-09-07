import { mockedEmailData } from "@/lib/data/mockedEmail";
import { TabsContent } from "@radix-ui/react-tabs";
import moment from "moment";
import React, { useState } from "react";

// Updated Email type to handle cc as string[]
type Email = {
  from: string;
  to: string;
  cc?: string[]; // Updated to match the structure of the mocked data
  bcc?: string;
  subject: string;
  body: string;
  date: string;
};

const AllEmails = () => {
  // Define the state with the Email type or null
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email); // Set the clicked email as the selected email
  };

  return (
    <TabsContent value="all" className="space-y-4 my-3 ">
      <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:w-[850px] ">
        {/* Left side: List of emails */}
        <div
          className={` col-span-1 space-y-2 ${
            selectedEmail ? "" : "border-gray-300"
          } p-4`}
        >
          {mockedEmailData.map((email: Email, index) => (
            <div
              key={index}
              className={`cursor-pointer border ${
                selectedEmail === email
                  ? "border-blue-100 border-1.5"
                  : "hover:bg-gray-100"
              } p-4 rounded-lg w-1/2 lg:w-full `}
              onClick={() => handleEmailClick(email)} // When clicked, show full email
            >
              <div className="text-right text-[10px] md:text-sm text-gray-500">
                {moment(`${email.date}`).format("MMMM Do, YYYY")}
              </div>
              <div className="font-semibold">From: {email.from}</div>
              {email.to && <div>To: {email.to}</div>}
              {email.cc && <div>CC: {email.cc.join(", ")}</div>}{" "}
              {/* Joining array */}
              <div className="font-semibold mt-2 border-b">
                Subject: {email.subject}
              </div>
              {/* Show a part of the body in the list */}
              <div className="mt-2 text-[10px] md:text-sm truncate">
                {email.body.length > 100
                  ? email.body.slice(0, 100) + "..."
                  : email.body}
              </div>
            </div>
          ))}
        </div>

        {/* Right side: Display full email when one is clicked */}
        <div
          className={` md:col-span-1 lg:col-span-2 p-4 rounded-lg shadow-sm   ${
            selectedEmail ? "bg-[#F5F8FA]  h-fit" : "bg-white"
          }`}
        >
          {selectedEmail ? (
            <div>
              <div className="text-right text-[10px] md:text-sm ">
                {moment(`${selectedEmail.date}`).format("MMMM Do, YYYY")}
              </div>
              <div className="font-semibold text-gray-200">
                From: {selectedEmail.from}
              </div>
              {selectedEmail.to && (
                <div className="text-gray-200">To: {selectedEmail.to}</div>
              )}
              {selectedEmail.cc && (
                <div className="text-gray-200">
                  CC: {selectedEmail.cc.join(", ")}
                </div>
              )}
              <div className="font-semibold mt-2 border-b">
                Subject: {selectedEmail.subject}
              </div>
              <div className="mt-2 text-[10px] md:text-sm">
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              Select an email to view its content
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default AllEmails;
