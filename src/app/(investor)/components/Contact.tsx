import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ContactPage from "./Contacts/ContactPage";
import { Investor } from "@/lib/data/mocked";

interface Props {
	selectedItem: Investor;
	onUpdate: () => void;
}
const Contact: React.FC<Props> = ({ selectedItem, onUpdate }) => {
	return (
		<TabsContent value='contact' className='w-full h-full '>
			<ContactPage selectedItem={selectedItem} onUpdate={onUpdate} />
		</TabsContent>
	);
};

export default Contact;
