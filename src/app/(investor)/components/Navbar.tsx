"use client";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  setActiveTab,
  resetSelectedRow,
  getSelectedRow,
  getActiveTab,
} from "@/lib/slice/selectedRowSlice";
import { Menu, X } from "lucide-react";
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
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {
  getPanel,
  toggleFilterPanel,
  toggleSearchPanel,
  closeAllPanels,
} from "@/lib/slice/panelSlice";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Navbar = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const { data: session } = useSession();
  const { showFilter, showSearch } = useSelector(getPanel);
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedRow = useSelector(getSelectedRow);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const selectedRowId = localStorage.getItem("selectedRowId");

  const activeTab = useSelector(getActiveTab);
  const shouldClosePanels = () => {
    return (
      pathname === "/dashboard" &&
      detail !== "" &&
      detail !== null &&
      tab === "detail"
    );
  };
  const shouldRender = () => {
    // Check if the path is "/dashboard"
    if (pathname === "/dashboard") {
      // If 'detail' query param is empty and 'tab' is 'detail'
      if (
        searchParams.get("detail") === "" &&
        searchParams.get("tab") === "detail"
      ) {
        return true;
      }
      // If no query params, treat it as /dashboard
      if (!searchParams.get("detail") && !searchParams.get("tab")) {
        return true;
      }
    }
    return false;
  };
  const detail = searchParams.get("detail"); // Get the 'detail' parameter from the URL
  console.log(tab);
  const pathname = usePathname();

  console.log(pathname);
  React.useEffect(() => {
    if (pathname === "/profile") {
      dispatch(setActiveTab(""));
    }
  }, [pathname, dispatch]);
  React.useEffect(() => {
    if (shouldClosePanels()) {
      dispatch(closeAllPanels());
    }
  }, [pathname, detail, tab, dispatch]);
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
              className={`w-full h-full rounded-none border-b rounded-t-md 
                  ${
                    activeTab === "investors"
                      ? " data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none bg-white"
                      : ""
                  }
                `}
              // className="w-full h-full rounded-none border-b rounded-t-md"
              onClick={handleInvestorsClick}
            >
              Investors
            </TabsTrigger>
            {selectedRow && (
              <TabsTrigger
                value={selectedRow}
                className={`w-full h-full rounded-none border-b rounded-t-md 
                 ${
                   activeTab === selectedRow
                     ? " data-[state=active]:border-b-0 data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:bg-white data-[state=active]:shadow-none bg-white"
                     : ""
                 }`}
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
        {pathname !== "/profile" &&
        ((tab as string) !== "contact" || (tab as string) === "detail") ? (
          <>
            <div
              className="flex gap-x-2 items-center h-full"
              onClick={() => {
                shouldRender() && dispatch(toggleFilterPanel());
              }}
            >
              <Filter />
              <p>Filter</p>
            </div>

            <div
              className="h-1/2 items-center flex gap-x bordr w-1/4"
              onClick={() => {
                shouldRender() && dispatch(toggleSearchPanel());
              }}
            >
              <Search size={14} />
              <input
                placeholder="Search"
                className="focus-visible:outline-none h-1/2 px-2 w-[90%] bg-inherit"
              />
            </div>
            <Dialog>
              <DialogTrigger className="flex gap-x-2 text-sm h-14 items-center">
                <Button className="hover:bg-[#0691A5] text-white h-10 items-center gap-x-2">
                  <FaPlus />
                  Add New
                </Button>
              </DialogTrigger>
              <AddInvestorForm />
            </Dialog>
          </>
        ) : (
          <Link href={"profile"}>
            <Button className="bg-[#dcf8fc] hover:bg-[#B9E5EB] text-[#1E1E1E] flex items-center gap-x-1">
              <FaPen />
              Edit
            </Button>
          </Link>
        )}

        <div className="">
          <p className="max-w-[90px] truncate ">{session?.user.firstName}</p>
        </div>
        {/* <div className="">
          
        </div> */}

        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="outline"> */}
              <Image
                src={"/images/pfp (1).png"}
                width={40}
                height={40}
                className=""
                alt="img"
              />
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuLabel className="flex w-full justify-center">
                <Button
                  className="mx-8 p-2 hover:bg-transparent bg-transparent "
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                >
                  Signout
                </Button>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuLabel className="flex w-full justify-center">
                <Link href={"profile"}>
                  <Button className="bg-transparent hover:bg-transparent ">
                    Profile
                  </Button>
                </Link>
              </DropdownMenuLabel> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" md:hidden flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10">
            <DropdownMenuLabel className="flex w-full justify-center">
              <Button
                className="mx-8 p-2 hover:bg-transparent bg-transparent "
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                Signout
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
