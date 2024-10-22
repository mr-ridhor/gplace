export type mockedInfoType = {
	name: string;
	title: string;
	email: string;
	phone: string;
	contactType?: string;
	investor?: string;
	_id?: string;
	surname: string;
	// user: string;
};
import { z } from "zod";

export const mockedInfoSchema = z.object({
	name: z.string(),
	surname: z.string(),
	title: z.string(),
	email: z.string().email(), // Validates that the string is a valid email format
	phone: z.string(), // You may want to add more specific validation for phone numbers
	contactType: z.string().optional(),
	investor: z.string().optional(),
	_id: z.string().optional(), // Typically, you might want to validate the format of an ID (like a MongoDB ObjectId)
	// user: z.string().optional(), // Uncomment if you want to include user and make it optional
});

export const mockedInfo: Array<{
	name: string;
	title: string;
	email: string;
	phone: string;
	contactType: string;
}> = [
	{
		name: "Alice Johnson",
		title: "CEO",
		email: "alice.johnson@company.com",
		phone: "+1 (555) 123-4567",
		contactType: "Business",
	},
	{
		name: "Bob Smith",
		title: "CTO",
		email: "bob.smith@techfirm.com",
		phone: "+44 (20) 7946 0958",
		contactType: "Technical",
	},
	{
		name: "Catherine Lee",
		title: "Marketing Director",
		email: "catherine.lee@marketing.co",
		phone: "+1 (555) 987-6543",
		contactType: "Business",
	},
	{
		name: "David Brown",
		title: "Lead Developer",
		email: "david.brown@devworks.com",
		phone: "+61 (3) 9123 4567",
		contactType: "Technical",
	},
	{
		name: "Emma Wilson",
		title: "Sales Manager",
		email: "emma.wilson@salespro.com",
		phone: "+1 (555) 765-4321",
		contactType: "Sales",
	},
];
