// "use client";

// import { useDispatch } from "react-redux";
// import {
//   fetchInvestorsFailure,
//   fetchInvestorsRequest,
//   fetchInvestorsSuccess,
// } from "../slice/investorSlice";
// import { toast } from "sonner";
// import moment from "moment";

// export const loadInvestors = async (endpoint: string = "/api/investors") => {
//   const dispatch = useDispatch();

//   dispatch(fetchInvestorsRequest());

//   try {
//     const response = await fetch(endpoint);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     dispatch(fetchInvestorsSuccess(data));
//   } catch (error: any) {
//     dispatch(fetchInvestorsFailure("Failed to fetch investors"));
//     toast(error.message, {
//       description: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
//     });
//   }
// };
"use client";

import { useDispatch } from "react-redux";
import {
  fetchInvestorsFailure,
  fetchInvestorsRequest,
  fetchInvestorsSuccess,
} from "../slice/investorSlice";
import axios from "axios";

useEffect(() => {
  const loadInvestors = async () => {
    dispatch(fetchInvestorsRequest());
    try {
      const { data } = await axios.get("/api/investors");
      dispatch(fetchInvestorsSuccess(data));
    } catch (error: any) {
      dispatch(fetchInvestorsFailure(error.response?.data?.message || "Error"));
      // Optional: show a toast notification
    }
  };

  loadInvestors();
}, [dispatch]);
