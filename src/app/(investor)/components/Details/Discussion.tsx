"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Investor } from "@/lib/data/mocked";
import {
	formatNumberWithCommas,
	formatNumberWithCommasDp,
} from "@/lib/numeralFormatter";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
interface Props {
	selectedItem: Investor;
}
const Discussion: React.FC<Props> = ({ selectedItem }) => {
	const [editingState, setEditingState] = useState({
		description: false,
		offerPrice: false,
	});
	const [values, setValues] = useState({
		description: selectedItem.companyInfo.description,
		offerPrice: selectedItem.offeredPrice.valuation,
		// country:list.companyInfo.country
	});

	const handleDoubleClick = (field: keyof typeof editingState) => (e: any) => {
		e.stopPropagation();
		setEditingState((prev) => ({ ...prev, [field]: true }));
	};

	const handleBlur = (field: keyof typeof editingState) => {
		return async () => {
			setEditingState((prev) => ({ ...prev, [field]: false }));
			await saveChanges(field);
		};
	};
	const handleChange =
		(field: keyof typeof values) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValues((prev) => ({ ...prev, [field]: e.target.value }));
		};
	const handleKeyPress =
		(field: keyof typeof editingState) =>
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleBlur(field)();
			}
		};
	const saveChanges = async (field: keyof typeof values) => {
		const payload = {
			description: values.description,
			offeredPriceValuation: values.offerPrice,
		};
		try {
			const response = await axios.put(`/api/investors/${selectedItem._id}`, {
				companyInfo: payload.description,
				offeredPriceValuation: payload.offeredPriceValuation,
			});
			console.log("Description updated:", response.data);
		} catch (error) {
			console.error("Error updating description:", error);
		}
	};
	let industries = selectedItem.investmentBio.industry;

	return (
		<div className='space-y-4  py-3'>
			<div className='grid gap-x-5 grid-cols-2 gap-y-3 md:grid-cols-4 w-full'>
				<Card className='border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] col-span-1'>
					<CardContent className='h-[100px] gap-y-2 flex flex-col justify-center  tems-center'>
						<p className='text-[10px] lg:text-sm'>Primary Contact</p>
						<p className='font-medium text-[10px] lg:text-sm  truncate capitalize'>
							{selectedItem.primaryContact.name}
						</p>
					</CardContent>
				</Card>
				<Card className='border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1'>
					<CardContent className='h-[100px] gap-y-2 flex flex-col justify-center  tems-center'>
						<p className='text-[10px] lg:text-sm'># of Deals in 5 Years</p>
						<p className='font-medium text-[10px] lg:text-sm'>
							{formatNumberWithCommas(
								`${selectedItem.investmentBio.dealsIn5Y}`
							)}
						</p>
					</CardContent>
				</Card>
				<Card className='border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1'>
					<CardContent className='h-[100px] gap-y-2 flex flex-col justify-center  tems-center'>
						<p className='text-[10px] lg:text-sm'>Median Deal Size ($ mm)</p>
						<p className='font-medium text-[10px] lg:text-sm'>
							{formatNumberWithCommas(
								`${selectedItem.investmentBio.medianDealSize}`
							)}
						</p>
					</CardContent>
				</Card>
				<Card className='border-l-2 border-l-[#03AAC1] shadow-md rounded-none border-t-0 border-b-0 border-r-0 h-[100px] order-2 col-span-1'>
					<CardContent className='h-[100px] gap-y-2 flex flex-col justify-center  tems-center'>
						<p className='text-[10px] lg:text-sm'>AUM ($ mm)</p>
						<p className='font-medium text-[10px] lg:text-sm'>
							{formatNumberWithCommas(`${selectedItem.investmentBio.AUM}`)}
						</p>
					</CardContent>
				</Card>
			</div>
			<div className='w-full gap-y-2 md:grid-cols-2 text-[10px] lg:text-sm grid gap-x-4 '>
				{/* <Card className='border col-span-1 b'>
					<CardHeader className='text-[#898989]'>
						<p>Description</p>
					</CardHeader>
					<CardContent className='text-[10px] lg:text-sm '>
						{selectedItem.companyInfo.description}
					</CardContent>
				</Card> */}
				{/* <div className="w-full gap-y-2 md:grid-cols-2 text-[10px] lg:text-sm grid gap-x-4"> */}
				<Card className='border col-span-1'>
					<CardHeader className='text-[#898989]'>
						<p>Description</p>
					</CardHeader>
					<CardContent className='text-[10px] lg:text-sm '>
						{editingState.description ? (
							<input
								type='text'
								value={values.description}
								onChange={handleChange("description")}
								onBlur={handleBlur("description")}
								onKeyPress={handleKeyPress("description")}
								className='w-full border p-1 rounded '
							/>
						) : (
							<p onDoubleClick={handleDoubleClick("description")}>
								{values.description}
							</p>
						)}
					</CardContent>
				</Card>
				<Card className='border col-span-1'>
					<CardHeader className='text-[#898989]'>
						<p>Investment Profile</p>
					</CardHeader>
					<CardContent className='text-[10px] lg:text-sm w-full space-y-4  px-2'>
						<div className='w-full  2xl:w-[80%] justify-between h-1/2 flex ap-x-3'>
							<div className='space-y-2 w-[65%] '>
								<p className='text-[8px] lg:text-sm'>Investment industry</p>
								{/* <div className='bg-[#F5E2B7] rounded-md flex items-center w-[100px] justify-center h-8'> */}
								<div className='flex items-center flex-wrap gap-3  w-full'>
									{industries &&
									industries.length > 0 &&
									industries[0].includes(",") ? (
										industries[0].split(",").map((industry, id) => (
											<div
												className='flex px-2 w-max bg-[#F5E2B7] rounded-md  items-center  justify-center h-8'
												key={id}
											>
												<p className={`w-max`}>{industry.trim()} </p>
											</div>
										))
									) : (
										<div className='flex  bg-[#F5E2B7] rounded-md  items-center  justify-center h-8 gap-y-3'>
											<p className={``}>{industries}</p>
										</div>
									)}
								</div>
							</div>
							<div className='space-y-2  w-[35%]'>
								<p className='text-[8px] lg:text-sm'>Investment Geographies</p>
								<div className='bg-[#E4DAF4] rounded-md flex items-center w-[100px] justify-center h-8'>
									<p>{selectedItem.investmentBio.geography}</p>
								</div>
							</div>
						</div>
						<div className='h2'>
							<div className=''>
								<p># of Deals in LTM</p>
								<p>
									{formatNumberWithCommas(
										`${selectedItem.investmentBio.dealsInLTM}`
									)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='w-full text-[10px] lg:text-sm p-4 border rounded-md space-y-4 '>
				<div className='flex w-full justify-between items-center'>
					<p className='text-[#898989]'>Offered Price</p>
					{/* <Button className="text-[10px] lg:text-sm text-white flex gap-x-1 items-center">
            <Link href={""}>Request Info</Link>
            <BiLogoTelegram />
          </Button> */}
				</div>
				<div className='text-[10px] lg:text-sm grid-cols-3 grid w-full'>
					<div className='col-span-1'>
						<p className=''>Valuation ($ 000)</p>
						{/* <p className=''>
							$
							{formatNumberWithCommas(
								`${selectedItem.offeredPrice.valuation} `
							)}
						</p> */}
						{editingState.offerPrice ? (
							<input
								type='text'
								value={values.offerPrice}
								onChange={handleChange("offerPrice")}
								onBlur={handleBlur("offerPrice")}
								onKeyPress={handleKeyPress("offerPrice")}
								className=' border p-1 rounded w-fit'
							/>
						) : (
							<p onDoubleClick={handleDoubleClick("offerPrice")}>
								${formatNumberWithCommas(`${values.offerPrice}`)}
							</p>
						)}
					</div>
					<div className='col-span-1'>
						<p className=''>EV/Revenue</p>
						<p className=''>
							{selectedItem.offeredPrice.revenue}x
							{/* $
              {formatNumberWithCommas(
                `${selectedItem.targetInfo.revenue.from} `
              )}{" "}
              - $
              {formatNumberWithCommas(`${selectedItem.targetInfo.revenue.to} `)} */}
						</p>
					</div>
					<div className='col-span-1'>
						<p className=''>EV/EBITDA</p>
						<p className=''>{selectedItem.offeredPrice.EBITDA}x</p>
					</div>
				</div>
			</div>

			<div className='w-full text-[10px] lg:text-sm p-4 border rounded-md space-y-4'>
				<div className='flex w-full justify-between items-center'>
					<p className='text-[#898989]'>Typical Price Paid</p>
					{/* <Button className="text-[10px] lg:text-sm text-white flex gap-x-1 items-center">
            <Link href={""}>Request Info</Link>
            <BiLogoTelegram />
          </Button> */}
					{(selectedItem.paidInfo.valuation.to === "0" ||
						selectedItem.paidInfo.valuation.to === "") && (
						<Button className='text-[10px] lg:text-sm text-white flex gap-x-1 items-center'>
							Request Info
							<BiLogoTelegram />
						</Button>
					)}
				</div>
				<div className='text-[10px] lg:text-sm grid-cols-3 grid w-full'>
					<div className='col-span-1'>
						<p className=''>Valuation ($ 000)</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								$
								{formatNumberWithCommas(
									`${selectedItem.paidInfo.valuation.from} `
								)}
							</p>
							-
							<p>
								$
								{formatNumberWithCommas(
									`${selectedItem.paidInfo.valuation.to} `
								)}
							</p>
						</div>
					</div>
					<div className='col-span-1'>
						<p className=''>EV/Revenue</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								{formatNumberWithCommasDp(
									`${selectedItem.paidInfo.revenue.from} `
								)}
								x
							</p>
							-
							<p>
								{formatNumberWithCommasDp(
									`${selectedItem.paidInfo.revenue.to} `
								)}
								x
							</p>
						</div>
					</div>
					<div className='col-span-1'>
						<p className=''>EV/EBITDA</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								{formatNumberWithCommasDp(
									`${selectedItem.paidInfo.EBITDA.from}`
								)}
								x
							</p>
							-
							<p>
								{formatNumberWithCommasDp(`${selectedItem.paidInfo.EBITDA.to}`)}
								x
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full p-4 border rounded-md space-y-4 text-[10px] lg:text-sm'>
				<div className='flex w-full justify-between items-center'>
					<p className='text-[#898989]'>Typical Acquisition Target</p>
					{/* <Button className="text-[10px] lg:text-sm text-white flex gap-x-1 items-center">
            <Link href={""}>Request Info</Link>
            <BiLogoTelegram />
          </Button> */}
					{(selectedItem.targetInfo.revenue.to === "0" ||
						selectedItem.targetInfo.revenue.to === "") && (
						<Button className='text-[10px] lg:text-sm text-white flex gap-x-1 items-center'>
							Request Info
							<BiLogoTelegram />
						</Button>
					)}
				</div>
				<div className='grid-cols-3 grid w-full'>
					<div className='col-span-1'>
						<p className=''>Deal Size ($ 000)</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								$
								{formatNumberWithCommas(
									`${selectedItem.targetInfo.dealSize.from} `
								)}
							</p>
							-
							<p>
								$
								{formatNumberWithCommas(
									`${selectedItem.targetInfo.dealSize.to} `
								)}
							</p>
						</div>
					</div>
					<div className='col-span-1'>
						<p className=''>Revenue ($ 000)</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								$
								{formatNumberWithCommas(
									`${selectedItem.targetInfo.revenue.from}`
								)}{" "}
							</p>
							-
							<p>
								$
								{formatNumberWithCommas(
									`${selectedItem.targetInfo.revenue.to} `
								)}
							</p>
						</div>
					</div>
					<div className='col-span-1'>
						<p className=''>EBITDA ($ 000)</p>
						<div className='flex-row items-center gap-1 flex '>
							<p className=''>
								$
								{formatNumberWithCommas(
									`${selectedItem.targetInfo.EBITDA.from}`
								)}
							</p>
							-
							<p>
								$
								{formatNumberWithCommas(`${selectedItem.targetInfo.EBITDA.to}`)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Discussion;
