"use server";

import { getServerSession } from "next-auth/next";
import axiosService from "../services/axiosService";
import { authOptions } from "../../../utils/authOptions";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const fetchInvestors = async () => {
  try {
    const response = await axios.get(`api/investors`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("No investor found ", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Error fetching investors"
    );
  }
};

export const fetchInvestor = async (detail: string) => {
  try {
    // Retrieve the session
    // const session: any = await getServerSession(authOptions);

    let token;
    // if (session) {
    //   token = session?.user?.dbToken; // Extract the token from the session
    // }

    // Configure headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Fetch investor details with the appropriate headers
    const response = await fetch(`api/investors/${detail}`, { headers });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData?.message ?? "Error fetching investor");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    // Handle other errors
    throw new Error(error.message ?? "Error fetching investor");
  }
};

export const addContact = async (contactData: {
  investor: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  title: string;
}) => {
  return axios
    .post("investor/contact", contactData)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        "Error adding contact:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Error adding contact");
    });
};

export const fetchInvestorContacts = async (investorId: string) => {
  try {
    // Retrieve the session
    // const session: any = await getServerSession(authOptions);

    let token;
    // if (session) {
    //   token = session?.user?.dbToken; // Extract the token from the session
    // }

    // Configure headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Fetch investor contacts with the appropriate headers
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/investors/${investorId}/contacts`,
      { headers }
    );

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData?.message ?? "Error fetching investor contacts");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching investor contacts:", error.message);
    throw new Error(error.message ?? "Error fetching investor contacts");
  }
};
