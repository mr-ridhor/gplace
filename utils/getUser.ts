import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getUser = async () => {
  const data = await getServerSession(authOptions);
  console.log(data);
  return data?.user;
};
