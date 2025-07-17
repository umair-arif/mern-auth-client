import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  const getAuthSate = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLogged(true);
        getUserData();
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getAuthSate();
  }, []);
  const value = {
    backendUrl,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
