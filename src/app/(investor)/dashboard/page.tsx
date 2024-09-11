import React from "react";
import Table from "./component/Table";

const page = () => {
  return (
    <div className="h-[80%] my-4 no-scrollbar overflow-y-auto">
      <Table />
      {/* <h1>Welcome to dashboard</h1> */}
    </div>
  );
};

export default page;
