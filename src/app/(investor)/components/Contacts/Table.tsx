import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { DataTable } from "@/components/ui/data-table";
import LoaderComponent from "@/components/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";

import { mockedInfoType } from "@/lib/data/mockedInfo";
import { fetchContacts } from "@/lib/slice/contactSlice";
import { AppDispatch, RootState } from "@/lib/services/StoreService";

interface Props {
	id: string;
}

const Table: React.FC<Props> = ({ id }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, status, error } = useSelector(
		(state: RootState) => state.contact
	);

	useEffect(() => {
		// if (status === "idle") {
		dispatch(fetchContacts(id));
		// }
	}, [dispatch, id]);
	if (status === "loading") {
		return (
			<div className='h-[250px] xl:h-[400px] 2xl:h-[900px] flex w-full items-center justify-center'>
				<LoaderComponent className='text-primary' />
			</div>
		);
	}
	return (
		<div className='h-[250px] xl:h-[400px] 2xl:h-[900px] flex w-full items-center justify-center'>
			<DataTable columns={Column} data={data} />
		</div>
	);
};

export default Table;
