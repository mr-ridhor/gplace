"use server";

export async function getProfileData() {
  try {
    const response = await fetch("/api/profile"); // Adjust the endpoint as needed
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile data");
  }
}
