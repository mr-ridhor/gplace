import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ContactPage from "./Contacts/ContactPage";
import { Investor } from "@/lib/data/mocked";

interface Props {
  selectedItem: Investor;
}
const Contact: React.FC<Props> = ({ selectedItem }) => {
  return (
    <TabsContent value="contact" className="w-full h-full overflow-hidden">
      <ContactPage selectedItem={selectedItem} />
    </TabsContent>
  );
};

export default Contact;
