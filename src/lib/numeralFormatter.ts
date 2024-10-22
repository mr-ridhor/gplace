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
// utils/formatNumber.ts
export const formatNumberWithCommasDp = (value: string | number): string => {
	const number = Number(value); // Convert to number
	return number.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
