"use client";
import CircularProgress from "@/app/svgComponent/CircularProgress";
import { Investor } from "@/lib/data/mocked";
import { formatNumberWithCommas } from "@/lib/numeralFormatter";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { calculateTextLength } from "../../../../utils/textLenth";

interface LeftbarProps {
	list: Investor; // Expecting a MockedData object
}

const Leftbar: React.FC<LeftbarProps> = ({ list }) => {
	const [editingState, setEditingState] = useState({
		country: false,
		website: false,
		yearFounded: false,
		companyName: false,
		employeeNo: false,
		offerPrice: false,
	});

	const [values, setValues] = useState({
		country: list.companyInfo.country,
		website: list.companyInfo.website,
		yearFounded: list.companyInfo.yearFounded,
		companyName: list.companyInfo.companyName,
		employeeNo: list.companyInfo.employeeNumber,
		offerPrice: list.offeredPrice.valuation,
		// country:list.companyInfo.country
	});

	const handleDoubleClick = (field: keyof typeof editingState) => (e: any) => {
		e.stopPropagation();
		setEditingState((prev) => ({ ...prev, [field]: true }));
	};

	const handleChange =
		(field: keyof typeof values) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValues((prev) => ({ ...prev, [field]: e.target.value }));
		};

	const saveChanges = async (field: keyof typeof values) => {
		const payload = {
			companyName: values.companyName,
			website: values.website,
			yearFounded: values.yearFounded,
			employeeNumber: values.employeeNo,
			country: values.country,
		};
		try {
			const response = await axios.put(`/api/investors/${list._id}`, {
				companyInfo: payload,
				offeredPriceValuation: values.offerPrice,
			});

			// if (response.statusText !== "ok") {
			//   throw new Error("Network response was not ok");
			// }

			// const data = await response.json();
			console.log("Update successful:", response);
		} catch (error) {
			console.error("Error updating data:", error);
		}
	};

	const handleBlur = (field: keyof typeof editingState) => {
		return async () => {
			setEditingState((prev) => ({ ...prev, [field]: false }));
			await saveChanges(field);
		};
	};

	const handleKeyPress =
		(field: keyof typeof editingState) =>
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleBlur(field)();
			}
		};
	const length = calculateTextLength(values.website);
	// alert(length);
	return (
		<div className='md:w-[200px] z-30 fixed w-full hidden md:flex items-start justify-center'>
			<div className='w-full rounded-md min-h-[220px] gap-1 xl:min-h-[340px] 2xl:min-h-[600px] md:flex flex-col items-start justify-center overflow-y-auto no-scrollbar py-4'>
				<div className='bg-[#F5F8FA]  space-y-1.5 xl:space-y-4 2xl:space-y-10 w-full'>
					<div className='my- w-full px-3'>
						{editingState.companyName ? (
							<input
								type='text'
								value={values.companyName}
								onChange={handleChange("companyName")}
								onBlur={handleBlur("companyName")}
								onKeyPress={handleKeyPress("companyName")}
								className='text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]'
								autoFocus
							/>
						) : (
							<p
								className='cursor-pointer font-bold capitalize'
								onDoubleClick={handleDoubleClick("companyName")}
							>
								{values.companyName}
							</p>
						)}
					</div>
					<div className='px-3 '>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>Country</p>
						{editingState.country ? (
							<input
								type='text'
								value={values.country}
								onChange={handleChange("country")}
								onBlur={handleBlur("country")}
								onKeyPress={handleKeyPress("country")}
								className='text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]'
								autoFocus
							/>
						) : (
							<p
								className='text-[12px] lg:text-sm cursor-pointer'
								onDoubleClick={handleDoubleClick("country")}
							>
								{values.country}
							</p>
						)}
					</div>
					{/* <div className="px-3">
            <p className="text-sm lg:text-base text-[#A7A7A7]">Website</p>
            {editingState.website ? (
              <input
                type="text"
                value={values.website}
                onChange={handleChange("website")}
                onBlur={handleBlur("website")}
                onKeyPress={handleKeyPress("website")}
                className="text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]"
                autoFocus
              />
            ) : (
              <Link href={values.website} passHref legacyBehavior>
                <a
                  className="text-[12px] lg:text-sm text-black hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  onDoubleClick={handleDoubleClick("website")}
                >
                  {values.website}
                </a>
              </Link>
            )}
          </div> */}
					<div className='px-3'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>Website</p>
						{editingState.website ? (
							<input
								type='text'
								value={values.website}
								onChange={handleChange("website")}
								onBlur={handleBlur("website")}
								onKeyPress={handleKeyPress("website")}
								className='text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]'
								autoFocus
							/>
						) : (
							<span
								className='text-[12px] lg:text-sm text-black hover:underline cursor-pointer'
								onDoubleClick={(e) => {
									e.preventDefault(); // Prevent any default link behavior
									e.stopPropagation(); // Prevent any parent click events
									handleDoubleClick("website")(e); // Enter editing mode
								}}
								onClick={(e) => {
									e.stopPropagation(); // Prevent any parent click events
									window.open(values.website, "_blank"); // Open the link on single click
								}}
							>
								{length > 24 ? values.companyName : values.website}
							</span>
						)}
					</div>

					<div className='px-3'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>Founded Year</p>
						{editingState.yearFounded ? (
							<input
								type='text'
								value={values.yearFounded}
								onChange={handleChange("yearFounded")}
								onBlur={handleBlur("yearFounded")}
								onKeyPress={handleKeyPress("yearFounded")}
								className='text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]'
								autoFocus
							/>
						) : (
							<p
								className='text-[12px] lg:text-sm cursor-pointer'
								onDoubleClick={handleDoubleClick("yearFounded")}
							>
								{values.yearFounded}
							</p>
						)}
					</div>
					<div className='px-3 w-full'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>
							Number of Employees
						</p>
						<div className=''>
							<p className='text-[12px] lg:text-sm'>
								{/* {formatNumberWithCommas(`${list.companyInfo.employeeNumber}`)} */}
							</p>
							{editingState.employeeNo ? (
								<input
									type='text'
									value={values.employeeNo}
									onChange={handleChange("employeeNo")}
									onBlur={handleBlur("employeeNo")}
									onKeyPress={handleKeyPress("employeeNo")}
									className='text-[12px] lg:text-sm border border-gray-300 rounded p-1 w-[80%]'
									autoFocus
								/>
							) : (
								<p
									className='text-[12px] lg:text-sm cursor-pointer'
									onDoubleClick={handleDoubleClick("employeeNo")}
								>
									{formatNumberWithCommas(`${values.employeeNo}`)}
								</p>
							)}
						</div>
					</div>
					<div className='px-3'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>Investor Type</p>
						<div className='rounded-md text-[12px] lg:text-sm text-blue-600'>
							{list.companyInfo.investorType}
						</div>
					</div>
				</div>
				<div className='bg-[#DCF8FC] rounded-md space-y-2 xl:space-y-10 py-1 w-full'>
					<div className='px-3'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>
							Offered Price ($ 000)
						</p>
						<div className='rounded-md text-[12px] lg:text-sm'>
							{/* ${formatNumberWithCommas(`${list.offeredPrice.valuation}`)} */}
							{editingState.offerPrice ? (
								<input
									type='text'
									value={values.offerPrice}
									onChange={handleChange("offerPrice")}
									onBlur={handleBlur("offerPrice")}
									onKeyPress={handleKeyPress("offerPrice")}
									className='w-full border p-1 rounded'
								/>
							) : (
								<p onDoubleClick={handleDoubleClick("offerPrice")}>
									${formatNumberWithCommas(`${values.offerPrice}`)}
								</p>
							)}
						</div>
					</div>
					<div className='px-3'>
						<p className='text-sm lg:text-base text-[#A7A7A7]'>
							Matching Score
						</p>
						<div className='w-[75%] flex flex-col items-center py-1 '>
							<div className='w-fit rounded-full border bg-[#57D08D] text-gren-600'>
								<CircularProgress
									percentage={list.matchScore.totalScore}
									circleWidth={40}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leftbar;
