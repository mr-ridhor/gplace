// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getActiveTab,
//   getSelectedRow,
//   resetSelectedRow,
//   setActiveTab,
// } from "@/lib/slice/selectedRowSlice";
// import { X } from "lucide-react"; // Assuming you're using lucide-react icons
// import Logo from "@/app/svgComponent/Logo";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import Image from "next/image";
// import Filter from "@/app/svgComponent/Filter";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { FaPen, FaPlus } from "react-icons/fa";
// import Link from "next/link";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import AddInvestorForm from "./AddInvestorForm";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const activeTab = useSelector(getActiveTab);
//   const selectedRow = useSelector(getSelectedRow);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL
//   const tab = searchParams.get("tab");
//   console.log("tab", tab);
//   const pathname = usePathname();
//   console.log(pathname);
//   // Handle clicking on the "Investors" tab
//   const handleInvestorsClick = () => {
//     router.push(`/dashboard?detail=&tab=detail`);

//     dispatch(setActiveTab("investors")); // Just switch the active tab without resetting the selected row
//   };

//   // Handle clicking on the "Selected Row" tab
//   const handleSelectedRowClick = () => {
//     if (selectedRow) {
//       dispatch(setActiveTab(selectedRow)); // Only run this if selectedRow is not null
//     }

//     // dispatch(setActiveTab(selectedRow)); // Switch to the selected row tab
//   };

//   // Handle close icon click to clear the selected row
//   const handleCloseClick = () => {
//     dispatch(resetSelectedRow()); // Reset the selected row
//   };

//   return (
//     <div className="w-full h-16 px-5 sticky top-0 z-10 flex items-center justify-between bg-[#F5F8FA]">
//       <div className="flex">
//         <div className=" bg-red00">
//           <Logo width={180} height={60} />
//         </div>

//         <Tabs value={activeTab} className="w-full p-2 md:flex hidden">
//           <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-12 p-0 ">
//             <TabsTrigger
//               value="investors"
//               className="w-full h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
//               onClick={handleInvestorsClick}
//             >
//               Investors
//             </TabsTrigger>

//             {/* Display the selectedRow tab only when there is a selected row */}
//             {selectedRow && (
//               <TabsTrigger
//                 value={selectedRow}
//                 className="w-full h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
//                 onClick={handleSelectedRowClick}
//               >
//                 <div className="flex items-center">
//                   {selectedRow}
//                   {/* Close icon next to the selected row */}
//                   <X
//                     className="ml-2 cursor-pointer"
//                     onClick={handleCloseClick}
//                     size={16}
//                   />
//                 </div>
//               </TabsTrigger>
//             )}
//           </TabsList>
//         </Tabs>
//       </div>

//       {/* Right side elements */}
//       <div className="hidden md:flex items-center h-full gap-x-4 bg-red-0 justify-end">
//         {tab === "detail" ||
//           (pathname === "/dashboard" && (
//             <div className="flex gap-x-2 items-center h-full">
//               <Filter />
//               <p>Filter</p>
//             </div>
//           ))}
//         {tab === "detail" ||
//           (pathname === "/dashboard" && (
//             <div className="h-1/2 items-center flex gap-x bordr w-1/4">
//               <Search size={14} />
//               <input
//                 placeholder="Search"
//                 className=" focus-visible:outline-none h-1/2 px-2 w-[90%] bg-inherit"
//               />
//             </div>
//           ))}
//         {pathname === "/dashboard" && (
//           <Dialog>
//             <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
//               <Button className="bg-[#03AAC1] text-white h-10 items-center gap-x-2">
//                 <FaPlus />
//                 Add New
//               </Button>
//             </DialogTrigger>
//             <AddInvestorForm />
//           </Dialog>
//         )}
//         {tab !== "detail" ||
//           (pathname !== "/dashboard" && (
//             <Link href={"profile"}>
//               <Button className="bg-[#dcf8fc] hover:bg-[#dcf8fc]/10   flex items-center gap-x-1">
//                 <FaPen />
//                 Edit
//               </Button>
//             </Link>
//           ))}
//         <div className="">
//           <p>Mr Ed.</p>
//         </div>
//         <div className="">
//           <Image
//             src={"/images/pfp (1).png"}
//             width={40}
//             height={40}
//             className=""
//             alt="img"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// Navbar.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  setActiveTab,
  resetSelectedRow,
  getSelectedRow,
  getActiveTab,
} from "@/lib/slice/selectedRowSlice";
import { X } from "lucide-react";
import Logo from "@/app/svgComponent/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Filter from "@/app/svgComponent/Filter";
import { FaPen, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddInvestorForm from "./AddInvestorForm";
import Image from "next/image";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedRow = useSelector(getSelectedRow);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const selectedRowId = localStorage.getItem("selectedRowId");

  const activeTab = useSelector(getActiveTab);

  const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL
  console.log(tab);
  const pathname = usePathname();
  console.log(pathname);
  const handleInvestorsClick = () => {
    router.push(`/dashboard?detail=&tab=detail`);
    dispatch(setActiveTab("investors"));
    // localStorage.removeItem("selectedRowId");
  };

  const handleSelectedRowClick = () => {
    if (selectedRow) {
      router.push(`/dashboard?detail=${selectedRowId}&tab=detail`);
      dispatch(setActiveTab(selectedRow));
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent triggers
    dispatch(resetSelectedRow());
    router.push(`/dashboard?detail=&tab=detail`); // Optionally reset to a default tab
    localStorage.removeItem("selectedRowId");
  };

  return (
    <div className="w-full h-16 px-5 sticky top-0 z-10 flex items-center justify-between bg-[#F5F8FA]">
      <div className="flex">
        <Logo width={180} height={60} />

        <Tabs value={tab || "detail"} className="w-full p-2 md:flex hidden">
          <TabsList className="w-full bg-inherit rounded-none rounded-t-md h-12 p-0">
            <TabsTrigger
              value="investors"
              className="w-full h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
              // className="w-full h-full rounded-none border-b rounded-t-md"
              onClick={handleInvestorsClick}
            >
              Investors
            </TabsTrigger>
            {selectedRow && (
              <TabsTrigger
                value={selectedRow}
                className="w-full h-full rounded-none border-b rounded-t-md data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none"
                // className="w-full h-full rounded-none border-b rounded-t-md"
                onClick={handleSelectedRowClick}
              >
                <div className="flex items-center">
                  {selectedRow}
                  <X
                    className="ml-2 cursor-pointer"
                    onClick={handleCloseClick}
                    size={16}
                  />
                </div>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
      <div className="hidden md:flex items-center h-full gap-x-4 bg-red-0 justify-end">
        {tab !== "contact" && tab === "detail" ? (
          <>
            <div className="flex gap-x-2 items-center h-full">
              <Filter />
              <p>Filter</p>
            </div>

            <div className="h-1/2 items-center flex gap-x bordr w-1/4">
              <Search size={14} />
              <input
                placeholder="Search"
                className="focus-visible:outline-none h-1/2 px-2 w-[90%] bg-inherit"
              />
            </div>
            <Dialog>
              <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
                <Button className="bg-[#03AAC1] text-white h-10 items-center gap-x-2">
                  <FaPlus />
                  Add New
                </Button>
              </DialogTrigger>
              <AddInvestorForm />
            </Dialog>
          </>
        ) : (
          <Link href={"profile"}>
            <Button className="bg-[#dcf8fc] hover:bg-[#dcf8fc]/10 flex items-center gap-x-1">
              <FaPen />
              Edit
            </Button>
          </Link>
        )}

        {/* {tab != "detail" && pathname !== "/dashboard" && (
          <Link href={"profile"}>
            <Button className="bg-[#dcf8fc] hover:bg-[#dcf8fc]/10 flex items-center gap-x-1">
              <FaPen />
              Edit
            </Button>
          </Link>
        )} */}

        <div className="">
          <p>Mr Ed.</p>
        </div>
        <div className="">
          <Image
            src={"/images/pfp (1).png"}
            width={40}
            height={40}
            className=""
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
