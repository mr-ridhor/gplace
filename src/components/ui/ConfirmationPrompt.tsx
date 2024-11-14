// ConfirmationPrompt.tsx
import React from "react";

const ConfirmationPrompt = ({
	onConfirm,
	onCancel,
}: {
	onConfirm: () => void;
	onCancel: () => void;
}) => (
	<div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
		<div className='bg-white p-6 rounded-lg'>
			<p>Are you sure you want to close the dialog?</p>
			<div className='mt-4'>
				<button
					onClick={onConfirm}
					className='bg-red-500 text-white px-4 py-2 rounded mr-2'
				>
					Yes
				</button>
				<button
					onClick={onCancel}
					className='bg-gray-500 text-white px-4 py-2 rounded'
				>
					No
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmationPrompt;
