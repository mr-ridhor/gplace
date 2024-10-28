import React, { FC } from "react";

import LoaderComponent from "@/components/LoaderComponent";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
	return (
		<div className='flex flex-col p-2 h-full items-center justify-center'>
			<LoaderComponent className='text-primary' />
		</div>
	);
};

export default loading;
