import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { apiClient } from "../../../Frontend/src/api/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMe = async () => {
    try {
      setIsLoading(true);
      let res = await apiClient("/api/user/getMe", {
        method: "GET",
        credentials: "include", // 🍪 IMPORTANT
      });
      //   console.log(res);
      setIsLoading(false);
      setUser(res);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isError, isLoading, setUser, setIsError, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
