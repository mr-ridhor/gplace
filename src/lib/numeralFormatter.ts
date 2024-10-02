export const numeralFormatter = (number: string): string => {
  return number.replace(/,/g, "");
};
export const formatNumberWithCommas = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
