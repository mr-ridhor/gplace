export type contType = {
	email: string;
	surname: string;
	phone: string;
	name: string;
	title: string;
	contactType?: "Primary" | "Secondary";
};
export type editContType = {
	email: string;
	surname: string;
	phone: string;
	name: string;
	title: string;
	contactType?: "Primary" | "Secondary";
	investorId: string;
	_id: string;
};
