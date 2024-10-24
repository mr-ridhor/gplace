import React, { useEffect } from "react";
import { Column } from "./Column";
import { DataTable } from "@/components/ui/data-table";
import LoaderComponent from "@/components/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchDataFailure,
	fetchDataStart,
	fetchDataSuccess,
} from "@/lib/slice/contactSlice";
import { mockedInfoType } from "@/lib/data/mockedInfo"; // Adjust the path based on your structure
import axios from "axios";

interface Props {
	id: string; // Assuming this is the ID of the investor
}

// Define the shape of the Redux state for type safety
interface RootState {
	data: {
		data: mockedInfoType[];
		loading: boolean;
		error: string | null;
	};
}

const Table: React.FC<Props> = ({ id }) => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector(
		(state: RootState) => state.data
	); // Access global state with type safety

	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetchDataStart()); // Dispatch loading state
			try {
				const response = await axios.get(`/api/investors/${id}/contact`);
				dispatch(fetchDataSuccess(response.data)); // Dispatch success action with fetched data
			} catch (error: any) {
				console.error("Error fetching contacts:", error);
				dispatch(fetchDataFailure(error.message || "Failed to fetch contacts")); // Dispatch error action
			}
		};

		fetchData();
	}, [id, dispatch]);

	if (loading) {
		return (
			<div className='w-full h-72 flex items-center justify-center'>
				<LoaderComponent className='w-8 h-8 text-[#03AAC1]' />
			</div>
		);
	}

	if (error) {
		return (
			<div className='w-full h-72 flex items-center justify-center'>
				<p className='text-red-600'>{error}</p> {/* Display error message */}
			</div>
		);
	}

	return (
		<div className='h-[250px] xl:h-[400px] 2xl:h-[900px]'>
			<DataTable columns={Column} data={data} />
		</div>
	);
};

// export default Table;

export default Table;
// import React, { useEffect, useState } from "react";
// import { Column } from "./Column";
// import { DataTable } from "@/components/ui/data-table";
// import LoaderComponent from "@/components/LoaderComponent";
// import axios from "axios";
// import { mockedInfoType } from "@/lib/data/mockedInfo";

// interface Props {
// 	id: string;
// }

// const Table: React.FC<Props> = ({ id }) => {
// 	// Local state for managing data, loading, and error
// 	const [data, setData] = useState<mockedInfoType[]>([]); // Adjust type as needed
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			setLoading(true); // Set loading state
// 			setError(null); // Reset error before fetching data

// 			try {
// 				const response = await axios.get(`/api/investors/${id}/contact`);
// 				if (response.status === 200) {
// 					setData(response.data); // Set fetched data
// 				} else {
// 					setError("No contact found"); // Handle non-200 responses
// 				}
// 			} catch (error: any) {
// 				console.log("error:", error);
// 				if (error.response?.data.message === "No Contacts Found") {
// 					setError("No contact found"); // Handle specific error
// 				} else {
// 					setError(error.response?.message || "An error occurred"); // Handle general errors
// 				}
// 			} finally {
// 				setLoading(false); // End loading state
// 			}
// 		};

// 		fetchData();
// 	}, [id]);

// 	if (loading)
// 		return (
// 			<div className='w-full h-72 flex items-center justify-center'>
// 				<LoaderComponent className='w-8 h-8 text-[#03AAC1]' />
// 			</div>
// 		);

// 	if (error) return <p>{error}</p>; // Display error if any

// 	return (
// 		<div className='h-[250px] xl:h-[400px] 2xl:h-[900px] '>
// 			<DataTable columns={Column} data={data} />
// 		</div>
// 	);
// };

// export default Table;
// import React, { useEffect } from "react";
// import { Column } from "./Column";
// import { DataTable } from "@/components/ui/data-table";
// import LoaderComponent from "@/components/LoaderComponent";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	fetchDataFailure,
// 	fetchDataStart,
// 	fetchDataSuccess,
// } from "@/lib/slice/contactSlice";

// interface Props {
// 	id: string;
// }

// const Table: React.FC<Props> = ({ id }) => {
// 	const dispatch = useDispatch();
// 	const { data, loading, error } = useSelector((state: any) => state.data); // Access global state

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			dispatch(fetchDataStart()); // Dispatch loading state
// 			try {
// 				const response = await axios.get(`/api/investors/${id}/contact`);
// 				console.log(response);
// 				if (response.status === 200) {
// 					dispatch(fetchDataSuccess(response.data)); // Dispatch success action with typed data
// 				}
// 			} catch (error: any) {
// 				console.log("error:", error);
// 				if (error.response?.data.message === "No Contacts Found") {
// 					dispatch(fetchDataFailure("No contact found")); // Dispatch error action
// 				} else {
// 					dispatch(
// 						fetchDataFailure(error.response?.message || "Error fetching data")
// 					); // Dispatch error action
// 				}
// 			}
// 		};

// 		fetchData();
// 	}, [id, dispatch]);

// 	if (loading)
// 		return (
// 			<div className='w-full h-72 flex items-center justify-center'>
// 				<LoaderComponent className='w-8 h-8 text-[#03AAC1]' />
// 			</div>
// 		);

// 	if (error) return <p>{error}</p>; // Display error if any

// 	const filteredData = data.filter((item: any) => item._id === id); // Filter data for the specific id

// 	return (
// 		<div className='h-[250px] xl:h-[400px] 2xl:h-[900px] '>
// 			<DataTable columns={Column} data={filteredData} />
// 		</div>
// 	);
// };

// export default Table;
