export const mockedEmailData: Array<{
  from: string;
  to: string;
  cc?: string[]; // Optional array of CC recipients
  body: string;
  date: string;
  subject: string;
}> = [
  {
    from: "john.doe@example.com",
    to: "jane.smith@example.com",
    cc: ["manager@example.com", "hr@example.com"],
    body: `Hi Jane, Please find the attached report for Q3. Let me know if you need any changes. Additionally, I've added a section on the projected sales for the next quarter. I believe it provides a good outlook for our team's strategy moving forward. 
           We can discuss it further during our next meeting. Best regards, John.`,
    date: "2024-09-01 10:30:00",
    subject: "Q3 Report Submission",
  },
  {
    from: "alice.johnson@company.com",
    to: "team@company.com",
    cc: [],
    body: `Dear Team, A reminder about the meeting tomorrow at 2 PM. Please ensure to review the agenda beforehand. We have some key points to discuss, including the new project timelines and resource allocations. 
           Don’t forget to provide your feedback on the proposal shared last week. I look forward to hearing your thoughts. Best, Alice.`,
    date: "2024-09-02 14:15:00",
    subject: "Team Meeting Reminder",
  },
  {
    from: "support@service.com",
    to: "user@example.com",
    cc: [],
    body: `Dear User, Your request has been received, and our team is working on it. We will get back to you shortly. In the meantime, you can check our help center for more information on common issues. 
           We appreciate your patience as we work through this. If there’s anything else you need, feel free to contact us again. Regards, Support Team.`,
    date: "2024-09-03 09:45:00",
    subject: "Support Request Received",
  },
  {
    from: "michael.brown@consulting.com",
    to: "client@example.com",
    cc: ["assistant@consulting.com"],
    body: `Hello, As per our discussion, I’ve attached the revised proposal. Please review and let me know your thoughts. I've incorporated all the feedback you gave during our last call, and I believe it aligns well with your expectations. 
           If there are any additional changes or points for clarification, I’d be happy to discuss them further. Thanks, Michael.`,
    date: "2024-09-04 16:00:00",
    subject: "Revised Proposal Attached",
  },
  {
    from: "emma.wilson@salespro.com",
    to: "sales@company.com",
    cc: [],
    body: `Hi Team, Just a quick update on the latest sales numbers. We are trending 15% higher than last quarter! This growth is largely driven by the success of the recent marketing campaign and the introduction of new product lines. 
           We should aim to maintain this momentum as we move into the next quarter. Great job everyone! Cheers, Emma.`,
    date: "2024-09-05 11:25:00",
    subject: "Sales Update - Q3",
  },
  {
    from: "peter.adams@techcorp.com",
    to: "engineering@techcorp.com",
    cc: ["lead@techcorp.com"],
    body: `Hey Team, The deployment was successful. Please ensure all systems are running smoothly and report any issues immediately. 
           There were some minor issues during testing, but they have been resolved. Still, keep an eye on system performance for the next 24 hours. Thanks, Peter.`,
    date: "2024-09-06 09:00:00",
    subject: "Deployment Success",
  },
  {
    from: "julia.green@lawfirm.com",
    to: "legal@client.com",
    cc: [],
    body: `Dear Client, Attached is the updated contract for your review. Please let me know if there are any further changes you would like to make. We've made the adjustments you requested, including the revised payment schedule. 
           Once you approve, we can move forward with the finalization. Regards, Julia.`,
    date: "2024-09-07 13:45:00",
    subject: "Updated Contract",
  },
  {
    from: "marketing@fashionbrand.com",
    to: "subscriber@customer.com",
    cc: [],
    body: `Hi there! Don’t miss out on our exclusive fall collection, available now at discounted prices. These items are limited edition, so hurry before they’re gone! 
           Shop now and enjoy the best deals on the latest fashion trends. We hope to see you soon! Best, Fashion Brand Team.`,
    date: "2024-09-08 17:30:00",
    subject: "Exclusive Fall Collection - Shop Now!",
  },
  {
    from: "ceo@startup.com",
    to: "investors@startup.com",
    cc: ["coo@startup.com", "cfo@startup.com"],
    body: `Dear Investors, I am pleased to share our quarterly progress report. We have exceeded our targets and continue to see positive growth in all key areas. Our customer acquisition rates have doubled, and we’ve significantly expanded our market reach. 
           We are confident that our momentum will carry forward into the next quarter. We appreciate your continued support. Sincerely, CEO.`,
    date: "2024-09-09 12:00:00",
    subject: "Quarterly Progress Report",
  },
  {
    from: "no-reply@socialmedia.com",
    to: "user@socialmedia.com",
    cc: [],
    body: `Hello User, Your account has been successfully verified. You can now access all features of our platform. We hope you enjoy the new experience! 
           If you have any questions, our support team is here to help. Thanks for being part of our community. Social Media Team.`,
    date: "2024-09-10 15:20:00",
    subject: "Account Verified",
  },
];
