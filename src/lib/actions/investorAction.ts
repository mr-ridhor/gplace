"use server";
import axiosService from "../services/axiosService";
import { revalidatePath } from "next/cache";

export const addInvestor = async (payload: any) => {
  return axiosService
    .post("/investors", payload)
    .then(({ data }) => {
      // You can add path revalidation or similar actions
      revalidatePath("/", "page");
      return {
        data,
        message: "Investor data submitted successfully!",
      };
    })
    .catch(({ response }) => {
      throw new Error(
        response?.data?.message ?? "Error submitting investor data"
      );
    });
};

export const fetchInvestorContacts = async (
  investorId: string,
  token: string
) => {
  try {
    const response = await axiosService.get(
      `/investors/${investorId}/contacts`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch contacts");
    }

    return response.data; // Return the array of contacts
  } catch (error: any) {
    console.error("Error fetching contacts:", error.message);
    throw error;
  }
};
