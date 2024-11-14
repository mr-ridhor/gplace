import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
	if (!open) return null;

	const handleClose = () => {
		onOpenChange(false);
	};

	return createPortal(
		<div
			className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
			onClick={handleClose}
		>
			<div
				className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'
					onClick={handleClose}
				>
					×
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Dialog;
