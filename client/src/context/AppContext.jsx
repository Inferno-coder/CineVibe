import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const [userData, setUserData] = useState(false);

  // Function to get user data from database
  const getUserData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/get-user-data", {
        userId: user.id,
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const value = {
    backendUrl,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
