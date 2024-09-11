import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import EmailPage from "./EmailEchange/EmailPage";
import { Investor } from "@/lib/data/mocked";

interface Props {
  selectedItem?: Investor;
}
const Email: React.FC<Props> = ({ selectedItem }) => {
  return (
    <TabsContent value="email">
      <EmailPage />
    </TabsContent>
  );
};

export default Email;
