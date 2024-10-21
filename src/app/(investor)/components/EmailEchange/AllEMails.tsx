import { mockedEmailData } from "@/lib/data/mockedEmail";
import { TabsContent } from "@radix-ui/react-tabs";
import { ChevronDown } from "lucide-react";
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
		// Toggle the email view when clicked, close if already selected
		setSelectedEmail(selectedEmail === email ? null : email);
	};

	return (
		<TabsContent value='all' className='space-y-4 my-3'>
			{/* Container for the email list and details */}
			<div className='space-y-4 w-full '>
				{/* Email List */}
				<div className='space-y-2 border-b pb-4'>
					{mockedEmailData.map((email: Email, index) => (
						<div
							key={index}
							className={`cursor-pointer border ${
								selectedEmail === email
									? "border-blue-100 border-1.5 bg-gray-50"
									: "hover:bg-gray-100"
							} p-4 rounded-lg`}
							onClick={() => handleEmailClick(email)} // Toggle full email view when clicked
						>
							<div className=' text-[10px] md:text-sm text-gray-500 flex w-full justify-between items-center'>
								<p>{moment(`${email.date}`).format("MMMM Do, YYYY")}</p>
								<button type='button' onClick={() => handleEmailClick(email)}>
									<ChevronDown />
								</button>
							</div>
							<div className='font-semibold'>From: {email.from}</div>
							{email.to && <div>To: {email.to}</div>}
							{email.cc && <div>CC: {email.cc.join(", ")}</div>}
							<div className='font-semibold mt-2 border-b'>
								Subject: {email.subject}
							</div>
							{/* Toggle between truncated or full body based on selection */}
							<div className='mt-2 text-[10px] md:text-sm'>
								{selectedEmail === email
									? email.body // Show full email body when selected
									: email.body.length > 100
									? email.body.slice(0, 100) + "..." // Truncate when not selected
									: email.body}
							</div>
						</div>
					))}
				</div>

				{/* Full email content (optional, based on selection) */}
				{/* {selectedEmail && (
          <div className="bg-[#F5F8FA] p-4 rounded-lg shadow-sm">
            <div className="text-right text-[10px] md:text-sm">
              {moment(`${selectedEmail.date}`).format("MMMM Do, YYYY")}
            </div>
            <div className="font-semibold text-gray-700">
              From: {selectedEmail.from}
            </div>
            {selectedEmail.to && (
              <div className="text-gray-700">To: {selectedEmail.to}</div>
            )}
            {selectedEmail.cc && (
              <div className="text-gray-700">
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
        )} */}

				{/* {!selectedEmail && (
          <div className="text-gray-500 text-center">
            Select an email to view its content
          </div>
        )} */}
			</div>
		</TabsContent>
	);
};

export default AllEmails;
