// app/actions/deleteInvestor.ts

import { toast } from "@/components/ui/use-toast"; // Adjust the path as needed
import moment from "moment";
import { revalidatePath } from "next/cache";

export async function deleteContact(investorId: string, contactId: string) {
  try {
    const response = await fetch(
      `/api/investors/${investorId}/contact/${contactId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the investor");
    }

    return {
      success: true,
      message: "Investor deleted successfully",
      timestamp: moment().format("dddd, MMMM DD, YYYY [at] h:mm A"),
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while deleting the investor.",
    };
  }
}
