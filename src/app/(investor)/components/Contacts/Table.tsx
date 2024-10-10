import React, { useEffect } from "react";
import { Column } from "./Column";
import { DataTable } from "@/components/ui/data-table";
import LoaderComponent from "@/components/LoaderComponent";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//   fetchDataStart,
//   fetchDataSuccess,
//   fetchDataFailure,
// } from "@/store/dataSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "@/lib/slice/contactSlice";
import { mockedInfoType } from "@/lib/data/mockedInfo";
// import { mockedInfoType } from "@/types"; // Import the mockedInfoType

interface Props {
  id: string;
}

const Table: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.data); // Access global state

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataStart()); // Dispatch loading state
      try {
        const response = await axios.get(`/api/investors/${id}/contact`);
        // if(response.status == 404) dispatch(fetchDataSuccess('No contact found'))

        dispatch(fetchDataSuccess(response.data)); // Dispatch success action with typed data
      } catch (error: any) {
        dispatch(fetchDataFailure(error.message || "No contact found")); // Dispatch error action
      }
    };

    fetchData();
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <LoaderComponent className="w-8 h-8 text-[#03AAC1]" />
      </div>
    );

  if (error) return <p>{error}</p>; // Display error if any

  return (
    <div>
      <DataTable columns={Column} data={data} />{" "}
      {/* Render DataTable with typed data */}
    </div>
  );
};

export default Table;
