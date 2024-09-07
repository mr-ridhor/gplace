import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ContactPage from "./Contacts/ContactPage";

const Contact = () => {
  return (
    <TabsContent value="contact" className="w-full">
      <ContactPage />
    </TabsContent>
  );
};

export default Contact;
