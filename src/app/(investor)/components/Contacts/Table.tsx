"use client";

import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios"; // Importing Axios for API requests

interface Props {
  id: string;
}

const Table: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any[]>([]); // State for storing fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get(`/api/investors/${id}/contact`); // Axios GET request
        console.log("here", response);
        setData(response.data); // Set the data from the response
      } catch (error: any) {
        setError(error.message || "Failed to fetch contacts"); // Set error message in case of failure
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <DataTable columns={Column} data={data} />{" "}
      {/* Render DataTable with fetched data */}
    </div>
  );
};

export default Table;
