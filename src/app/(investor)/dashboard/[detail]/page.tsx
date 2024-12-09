// app/dashboard/[detail]/page.tsx
import React from "react";
import SelectedRow from "../../components/SelectedRow";
// import SelectedRow from "@/components/SelectedRow";

const DynamicPage = () => {
  return (
    <div className=" mb-4">
      <SelectedRow />
    </div>
  );
};

export default DynamicPage;
