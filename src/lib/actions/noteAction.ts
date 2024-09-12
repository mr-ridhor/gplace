import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/authOptions";

export const createNote = async (note: { title: string; body: string }) => {
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

    // Create a new note with the appropriate headers
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/note`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(note),
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData?.message ?? "Error creating note");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creating note:", error.message);
    throw new Error(error.message ?? "Error creating note");
  }
};
// export const fetchNotes = async () => {
//   try {
//     // Retrieve the session
//     const session: any = await getServerSession(Options);

//     let token;
//     if (session) {
//       token = session?.user?.dbToken; // Extract the token from the session
//     }

//     // Configure headers
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };
//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     // Fetch all notes with the appropriate headers
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/note`,
//       { headers }
//     );

//     if (!response.ok) {
//       // Handle HTTP errors
//       const errorData = await response.json();
//       throw new Error(errorData?.message ?? "Error fetching notes");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     console.error("Error fetching notes:", error.message);
//     throw new Error(error.message ?? "Error fetching notes");
//   }
// };
// export const deleteNote = async (id: string) => {
//   try {
//     // Retrieve the session
//     const session: any = await getServerSession(Options);

//     let token;
//     if (session) {
//       token = session?.user?.dbToken; // Extract the token from the session
//     }

//     // Configure headers
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };
//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     // Delete a note with the appropriate headers
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/note/${id}`,
//       {
//         method: "DELETE",
//         headers,
//       }
//     );

//     if (!response.ok) {
//       // Handle HTTP errors
//       const errorData = await response.json();
//       throw new Error(errorData?.message ?? "Error deleting note");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     console.error("Error deleting note:", error.message);
//     throw new Error(error.message ?? "Error deleting note");
//   }
// };
// export const getNoteById = async (id: string) => {
//   try {
//     // Retrieve the session
//     const session: any = await getServerSession(Options);

//     let token;
//     if (session) {
//       token = session?.user?.dbToken; // Extract the token from the session
//     }

//     // Configure headers
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };
//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     // Fetch a single note by ID with the appropriate headers
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/note/${id}`,
//       { headers }
//     );

//     if (!response.ok) {
//       // Handle HTTP errors
//       const errorData = await response.json();
//       throw new Error(errorData?.message ?? "Error fetching note");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     console.error("Error fetching note:", error.message);
//     throw new Error(error.message ?? "Error fetching note");
//   }
// };
