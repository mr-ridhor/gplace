export const numeralFormatter = (number: string): string => {
  return number.replace(/,/g, "");
};
export const formatNumberWithCommas = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// export const formatNumberWithCommas = (value: any): string => {
//   if (typeof value !== "string") {
//     value = String(value); // Convert to string if it's not already a string
//   }
//   return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };
