// import Image from "next/image";
// import React from "react";
// // import Topo from "../../../../public/Topo2.png";
// import Logo from "@/app/svgComponent/Logo";
// import Topo from "@/app/svgComponent/Topo";
// import User from "@/app/svgComponent/User";
// import Company from "@/app/svgComponent/CompanyIcon";
// import Users from "@/app/svgComponent/Users";
// import Key from "@/app/svgComponent/KeyIcon";
// import Mail from "@/app/svgComponent/Mail";
// import Mailer from "@/app/svgComponent/Mailer";

// interface LeftpaneProps {
//   currentForm: number;
// }
// const Leftpane: React.FC<LeftpaneProps> = ({ currentForm }) => {
//   const pane = [
//     { id: 1, step: "1 of 6", name: "Personal information", icon: <User /> },
//     { id: 2, step: "2 of 6", name: "Company information", icon: <Company /> },
//     { id: 3, step: "3 of 6", name: "Team information", icon: <Users /> },
//     { id: 4, step: "4 of 6", name: "Log in credentials", icon: <Key /> },
//     { id: 5, step: "5 of 6", name: "Email Verification", icon: <Mail /> },
//     { id: 6, step: "6 of 6", name: "Subscription plan", icon: <Mailer /> },
//   ];

//   return (
//     <div
//       className="h-screen space-y-5 z-20 top-0 hidden md:block fixed bg-gradient-to-b from-[#82e1ed] from-10% via-s[#8CE5F1] via-30% to-[#23ACBF] to-90%
// "
//     >
//       <div className="flex w-full items-center justify-center py-5">
//         <Logo />
//       </div>
//       <div className="h-fit w-full space-y-4">
//         {pane.map((item) => {
//           return (
//             <div className="flex h-[35px]  xl:h-[50px] xl:space-y-6 gap-x-2 items-center justify-center  w-full">
//               <div className="w-[20%] justify-end flex items-center h-full">
//                 {item.icon}
//               </div>
//               <div
//                 className={`w-[150px] items-center h-full ${
//                   item.id === currentForm ? "text-black" : "text-[#00454F]/30"
//                 } `}
//               >
//                 <p className="text-[10px] lg:text-sm">{item.step}</p>
//                 <p className="text-[10px] lg:text-sm ">{item.name}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="absolute bottom-0 w-[220px] xl:h-[35%]  md:h-[35%]">
//         <Topo />
//       </div>
//     </div>
//   );
// };

// export default Leftpane;
// import React from "react";
// import Logo from "@/app/svgComponent/Logo";
// import Topo from "@/app/svgComponent/Topo";
// import User from "@/app/svgComponent/User";
// import Company from "@/app/svgComponent/CompanyIcon";
// import Users from "@/app/svgComponent/Users";
// import Key from "@/app/svgComponent/KeyIcon";
// import Mail from "@/app/svgComponent/Mail";
// import Mailer from "@/app/svgComponent/Mailer";

// interface LeftpaneProps {
//   currentPage: string; // Full path to determine the current step
// }

// const Leftpane: React.FC<LeftpaneProps> = ({ currentPage }) => {
//   const registerSteps = [
//     { id: 1, step: "1 of 6", name: "Personal information", icon: <User /> },
//     { id: 2, step: "2 of 6", name: "Company information", icon: <Company /> },
//     { id: 3, step: "3 of 6", name: "Team information", icon: <Users /> },
//     { id: 4, step: "4 of 6", name: "Log in credentials", icon: <Key /> },
//     { id: 5, step: "5 of 6", name: "Email Verification", icon: <Mail /> },
//     { id: 6, step: "6 of 6", name: "Subscription plan", icon: <Mailer /> },
//   ];

//   const getCurrentStepId = () => {
//     if (currentPage.includes("otp")) return 5;
//     if (currentPage.includes("plan")) return 6;
//     // Map other steps accordingly
//     return 1; // Default step or handle as needed
//   };

//   const currentStepId = getCurrentStepId();

//   return (
//     <div className="h-screen space-y-5 z-20 top-0 hidden md:block fixed bg-gradient-to-b from-[#82e1ed] from-10% via-s[#8CE5F1] via-30% to-[#23ACBF] to-90% ">
//       <div className="flex w-full items-center justify-center py-5">
//         <Logo />
//       </div>
//       <div className="h-fit w-full space-y-4">
//         {registerSteps.map((item) => (
//           <div
//             key={item.id}
//             className={`flex h-[35px] xl:h-[50px] xl:space-y-6 gap-x-2 items-center justify-center w-full ${
//               item.id === currentStepId ? "text-black" : "text-[#00454F]/30"
//             }`}
//           >
//             <div className="w-[20%] justify-end flex items-center h-full">
//               {item.icon}
//             </div>
//             <div className="w-[150px] items-center h-full">
//               <p className="text-[10px] lg:text-sm">{item.step}</p>
//               <p className="text-[10px] lg:text-sm ">{item.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute bottom-0 w-[220px] xl:h-[35%] md:h-[35%]">
//         <Topo />
//       </div>
//     </div>
//   );
// };

// export default Leftpane;

import React from "react";
import Logo from "@/app/svgComponent/Logo";
import Topo from "@/app/svgComponent/Topo";
import User from "@/app/svgComponent/User";
import Company from "@/app/svgComponent/CompanyIcon";
import Users from "@/app/svgComponent/Users";
import Key from "@/app/svgComponent/Key";
import Mail from "@/app/svgComponent/Mail";
import Mailer from "@/app/svgComponent/Mailer";

interface LeftpaneProps {
  currentForm: number;
}

const Leftpane: React.FC<LeftpaneProps> = ({ currentForm }) => {
  const registerSteps = [
    { id: 1, step: "1 of 6", name: "Personal information", icon: <User /> },
    { id: 2, step: "2 of 6", name: "Company information", icon: <Company /> },
    { id: 3, step: "3 of 6", name: "Team information", icon: <Users /> },
    { id: 4, step: "4 of 6", name: "Log in credentials", icon: <Key /> },
    { id: 5, step: "5 of 6", name: "Email Verification", icon: <Mail /> },
    { id: 6, step: "6 of 6", name: "Subscription plan", icon: <Mailer /> },
  ];

  return (
    <div className="h-screen w-[220px] space-y-5 z-20 top-0 hidden md:block fixed bg-gradient-to-b from-[#82e1ed] from-10% via-s[#8CE5F1] via-30% to-[#23ACBF] to-90% ">
      <div className="flex w-full items-center justify-center py-5">
        <Logo />
      </div>
      <div className="h-fit w-full space-y-4">
        {registerSteps.map((item) => (
          <div
            key={item.id}
            className={`flex h-[35px] xl:h-[50px] xl:space-y-6 gap-x-2 items-center justify-center w-full ${
              item.id === currentForm ? "text-black" : "text-[#00454F]/30"
            }`}
          >
            <div className="w-[20%] justify-end flex items-center h-full">
              {item.icon}
            </div>
            <div className="w-[150px] items-center h-full">
              <p className="text-[10px] lg:text-sm">{item.step}</p>
              <p className="text-[10px] lg:text-sm ">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-[220px] xl:h-[35%] md:h-[35%]">
        <Topo />
      </div>
    </div>
  );
};

export default Leftpane;
