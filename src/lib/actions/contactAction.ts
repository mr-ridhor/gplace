"use server";

import { revalidatePath } from "next/cache";
import axiosService from "../services/axiosService";
import { contType } from "../zod-type/contType";

export const fetchEvents = async () => {
  return axiosService
    .get("/events")
    .then(({ data }) => {
      return {
        events: data.data ?? [],
      };
    })
    .catch(({ response }) => {
      throw new Error(response?.data?.message ?? "Error fetching events");
    });
};

// export const addEvent = async (payload: any) => {
//   return axiosService
//     .post("/events/add", payload)
//     .then(({ data }) => {
//       revalidatePath("/", "page");
//       return {
//         data,
//         message: "Event added successfully!",
//       };
//     })
//     .catch(({ response }) => {
//       throw new Error(response?.data?.message ?? "Error adding event");
//     });
// };
export const addContact = async (data: contType) => {
  const payload = {
    // investor: "605c72efb0f5f1a7c44a9d0d",
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: data.phone,
    title: data.title,
  };

  return axiosService
    .post("/investor/contacts", payload)
    .then(({ data }) => {
      // Simulate revalidating or updating the necessary paths, similar to addCategory
      revalidatePath("/", "page");
      return {
        data,
        message: "Contact submitted successfully!",
      };
    })
    .catch(({ response }) => {
      throw new Error(response?.data?.message ?? "Error submitting contact");
    });
};
