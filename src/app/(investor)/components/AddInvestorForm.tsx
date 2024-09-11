"use client";
import React, { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CompanyInfom from "./AddNewInvestor/CompanyInfom";
import ProfileInfo from "./AddNewInvestor/ProfileInfo";
import ProfileInfo2 from "./AddNewInvestor/ProfileInfo2";
import Target from "./AddNewInvestor/Target";
import Price from "./AddNewInvestor/Price";
import Contact from "./AddNewInvestor/Contact";
import { invcomType } from "@/lib/zod-type/invtcomType";
import { invproType } from "@/lib/zod-type/invproType";
import { invpro2Type } from "@/lib/zod-type/invpro2Type";
import { tragetType } from "@/lib/zod-type/targetType";
import { priceType } from "@/lib/zod-type/priceType";
import { contType } from "@/lib/zod-type/contType";
import { companyType } from "@/lib/zod-type/companyType";
import axiosService from "@/lib/services/axiosService";
import { addInvestor } from "@/lib/actions/investorAction";
import axios from "axios";
// import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const AddInvestorForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("company");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["company"]); // 'company' as default visited
  // const axiosAuth = useAxiosAuth();
  // List of all tabs
  const tabs = ["company", "profile", "profile2", "target", "price", "contact"];

  // Handle tab change and mark as visited
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (!visitedTabs.includes(value)) {
      setVisitedTabs([...visitedTabs, value]);
    }
  };

  // Handle moving to the next tab
  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1];
      handleTabChange(nextTab);
    }
  };
  const [invCom, setInvCom] = useState<invcomType>({
    name: "",
    country: "",
    city: "",
    noEmp: "",
    website: "",
    investorType: "",
    yearFounded: "",
    description: "",
  });

  const [profile, setProfile] = useState<invproType>({
    invInd: "",
    invGeo: "",
    noLTM: "",
  });

  const [profile2, setProfile2] = useState<invpro2Type>({
    med: "",
    aum: "",
    deal: "",
  });

  const [target, setTarget] = useState<tragetType>({
    rev: "",
    ebdt: "",
    dealsz: "",
  });
  const [price, setPrice] = useState<priceType>({
    val: "",
    evRev: "",
    evEbd: "",
  });
  const [companyInfo, setCompanyInfo] = useState<companyType>({
    name: "",
    country: "",
    city: "",
    email: "",
    website: "",
    industry: "",
    foundingYear: "",
    revenue: {
      ltm: "",
      previousYear: "",
    },
    grossProfit: {
      ltm: "",
      previousYear: "",
    },
    EBITDA: {
      ltm: "",
      previousYear: "",
    },
  });
  const [contact, setContact] = useState<contType>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    title: "",
  });
  const handleSubmit = async () => {
    // Combine all the data into one object
    const payload = {
      companyName: {
        companyName: invCom.name,
        country: invCom.country,
        city: invCom.city,
        website: invCom.website,
        yearFounded: invCom.yearFounded,
        employeeNumber: invCom.noEmp,
        investorType: invCom.investorType,
        description: invCom.description,
      },
      investmentBio: {
        industry: profile.invInd,
        geography: profile.invGeo,
        dealsInLTM: profile.noLTM,
        medianDealSize: profile2.med,
        AUM: profile2.aum,
        dealsIn5Y: profile2.deal,
      },
      targetInfo: {
        revenue: {
          from: target.rev,
          to: price.val,
        },
        EBITDA: {
          from: target.ebdt,
          to: price.evEbd,
        },
        dealSize: {
          from: target.dealsz,
          to: price.evEbd,
        },
      },
      paidInfo: {
        valuation: {
          from: 10000000, // (required)
          to: 70000000, // (required)
        },
        revenue: {
          from: 3000000, // (required)
          to: 17000000, // (required)
        },
        EBITDA: {
          from: 1200000, // (required)
          to: 6800000, // (required)
        },
      },
      primaryContact: {
        name: contact.name,
        surname: contact.surname,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
      },
    };
    console.log(payload);

    try {
      // const response = await axiosAuth.post("/investors", payload);
      const response = await axios.post('/api/investors', payload)

      if (response.status !== 200) {
        throw new Error("Failed to submit the data");
      }

      // router.push("/login");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  // const handleSubmit = async () => {
  //   // Combine all the data into one object (payload)
  //   const payload = {
  //     companyName: {
  //       companyName: invCom.name,
  //       country: invCom.country,
  //       city: invCom.city,
  //       website: invCom.website,
  //       yearFounded: invCom.yearFounded,
  //       employeeNumber: invCom.noEmp,
  //       investorType: invCom.investorType,
  //       description: invCom.description,
  //     },
  //     investmentBio: {
  //       industry: profile.invInd,
  //       geography: profile.invGeo,
  //       dealsInLTM: profile.noLTM,
  //       medianDealSize: profile2.med,
  //       AUM: profile2.aum,
  //       dealsIn5Y: profile2.deal,
  //     },
  //     targetInfo: {
  //       revenue: {
  //         from: target.rev,
  //         to: price.val,
  //       },
  //       EBITDA: {
  //         from: target.ebdt,
  //         to: price.evEbd,
  //       },
  //       dealSize: {
  //         from: target.dealsz,
  //         to: price.evEbd,
  //       },
  //     },
  //     paidInfo: {
  //       valuation: {
  //         from: 10000000, // (required)
  //         to: 70000000,  // (required)
  //       },
  //       revenue: {
  //         from: 3000000,  // (required)
  //         to: 17000000,   // (required)
  //       },
  //       EBITDA: {
  //         from: 1200000,  // (required)
  //         to: 6800000,    // (required)
  //       },
  //     },
  //     primaryContact: {
  //       name: contact.name,
  //       surname: contact.surname,
  //       email: contact.email,
  //       phone: contact.phone,
  //       title: contact.title,
  //     },
  //   };

  //   console.log(payload);  // Debugging to check the payload object

  //   try {
  //     // Use the addInvestor server action to submit the payload
  //     const response = await addInvestor(payload);
  //     console.log(response.message); // Handle the success message

  //     // Optionally navigate to another page (uncomment if needed)
  //     // router.push("/login");
  //   } catch (error:any) {
  //     console.error("Error submitting data:", error.message);  // Handle the error
  //   }
  // };

  return (
    <DialogContent className="max-h-[550px]  w-[600px] my-3 overflow-auto no-scrollbar">
      <div className="space-y-3">
        <p className="font-bold text-lg">Add Investor</p>

        {/* Tabs with disabled trigger buttons */}
        {currentTab === "company" && <p>Company Information</p>}
        {currentTab === "profile" && <p>Investment Profile information</p>}
        {currentTab === "profile2" && (
          <p>Investment Profile information (Continued)</p>
        )}
        {currentTab === "target" && (
          <p>Typical acquisation target information</p>
        )}
        {currentTab === "price" && <p>Typical price paid information</p>}
        {currentTab === "contact" && <p>Primary contact information</p>}
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full text-sm"
        >
          <TabsList className="grid grid-cols-6 w-full gap-x-2 justify-start bg-inherit mt-2 overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`text-[10px] lg:text-sm rounded-md px-3 py-1
                  ${
                    visitedTabs.includes(tab)
                      ? "bg-[#04acc2] text-white" // Same color for current and visited
                      : "bg-[#DCF8FC] text-black" // Default for unvisited
                  }
                `}
              >
                {/* {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "} */}
                {/* Capitalize first letter */}
              </div>
            ))}
          </TabsList>
          <CompanyInfom
            setCompanyInfo={setInvCom}
            companyInfo={invCom}
            onNext={handleNextTab}
          />
          {/* <CompanyInfom
            setCompanyInfo={setCompanyInfo}
            companyInfo={companyInfo}
            onNext={handleNextTab}
          /> */}
          <ProfileInfo
            setPro={setProfile}
            profile={profile}
            onNext={handleNextTab}
          />
          <ProfileInfo2
            setPro2={setProfile2}
            profile2={profile2}
            handleClick={handleNextTab}
          />

          <Target
            target={target}
            setTarget={setTarget}
            handleClick={handleNextTab}
          />

          <Price price={price} setPri={setPrice} handleClick={handleNextTab} />

          <Contact
            submit={handleSubmit}
            conct={contact}
            setContact={setContact}
          />
          {/* No "Next" button on the last tab */}
        </Tabs>
      </div>
    </DialogContent>
  );
};

export default AddInvestorForm;
