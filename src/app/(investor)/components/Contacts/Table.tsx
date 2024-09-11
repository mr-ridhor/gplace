"use client";
import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { fetchInvestorContacts } from "@/lib/actions/investorActions";
// import { fetchInvestorContacts } from "@/lib/actions/investorActions";

interface Props {
  id: string;
}

const Table: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await fetchInvestorContacts(id);
        setData(contacts);
      } catch (error: any) {
        setError(error.message || "Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data);

  return (
    <div>
      <DataTable columns={Column} data={data} />
    </div>
  );
};

export default Table;
