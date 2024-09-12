// import React from "react";
// import Table from "./component/Table";
// import { fetchInvestors } from "@/lib/actions/investorActions";

// const page = async () => {
//   return (
//     <div className="h-[80%] my-4 no-scrollbar overflow-y-auto">
//       <Table />
//     </div>
//   );
// };

// export default page;
// import React from "react";
// import Table from "./component/Table";
// import { fetchInvestors } from "@/lib/actions/investorActions";
// import { Investor } from "@/lib/data/mocked";

// const Page: React.FC = async () => {
//   let investors: Investor[] = [];

//   try {
//     investors = await fetchInvestors();
//     console.log(investors);
//   } catch (error) {
//     console.error("Failed to fetch investors:", error);
//   }

//   return (
//     <div className="h-[80%] my-4 no-scrollbar overflow-y-auto">
//       <Table investors={investors ?? []} />
//     </div>
//   );
// };

// export default Page;
"use client";

import React, { useEffect, useState } from "react";
import Table from "./component/Table";
import { fetchInvestors } from "@/lib/actions/investorActions";
import { Investor } from "@/lib/data/mocked";
import axios from "axios";

const Page: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvestors = async () => {
      try {
        // const data = await fetchInvestors();
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/investors`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data.data);
        setInvestors(data.data);
      } catch (error) {
        console.error("Failed to fetch investors:", error);
        setError("No investor found");
      } finally {
        setLoading(false);
      }
    };

    loadInvestors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div> {error}</div>;

  return (
    <div className="h-[80%] my-4 no-scrollbar overflow-y-auto">
      <Table investors={investors} />
    </div>
  );
};

export default Page;
