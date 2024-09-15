import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProfile } from "@/lib/slice/profileSlice"; // Adjust the import path as needed
import { getProfileData } from "./getProfile";
// import { getProfileData } from '@/services/profileService'; // Adjust the import path as needed

const useFetchProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfileData(); // Fetch profile data from your API
        dispatch(setProfile(profile)); // Update global state
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
};

export default useFetchProfile;
