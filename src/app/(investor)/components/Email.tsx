import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import EmailPage from "./EmailEchange/EmailPage";

const Email = () => {
  return (
    <TabsContent value="email">
      <EmailPage />
    </TabsContent>
  );
};

export default Email;
