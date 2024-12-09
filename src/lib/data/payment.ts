export type Payment={
plan_type:string,
card_number:string;
amount:string;
date: string;
}
export const payments: Payment[] = [
    { plan_type: "Premium", card_number: generateCardNumber(), amount: "29.99", date: "2024-12-01" },
    { plan_type: "Basic", card_number: generateCardNumber(), amount: "9.99", date: "2024-11-25" },
    { plan_type: "Enterprise", card_number: generateCardNumber(), amount: "99.99", date: "2024-10-15" },
    { plan_type: "Premium", card_number: generateCardNumber(), amount: "29.99", date: "2024-09-10" },
    { plan_type: "Basic", card_number: generateCardNumber(), amount: "9.99", date: "2024-08-05" },
    { plan_type: "Enterprise", card_number: generateCardNumber(), amount: "99.99", date: "2024-07-22" },
    { plan_type: "Premium", card_number: generateCardNumber(), amount: "29.99", date: "2024-06-12" },
    { plan_type: "Basic", card_number: generateCardNumber(), amount: "9.99", date: "2024-05-03" },
    { plan_type: "Enterprise", card_number: generateCardNumber(), amount: "99.99", date: "2024-04-18" },
    { plan_type: "Basic", card_number: generateCardNumber(), amount: "9.99", date: "2024-03-27" },
  ];
  
  // Function to generate a card number with the first 12 digits as asterisks and the last 4 digits as "1234"
  function generateCardNumber(): string {
    const first12Digits = "************"; // First 12 digits as asterisks
    const last4Digits = "1234"; // Fixed last 4 digits
    return first12Digits + last4Digits;
  }
  
  