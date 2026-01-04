import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMe = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:9000/api/user/getMe", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      console.log(data.user)
    } catch (err) {
      console.log(err)
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
      value={{ user, setUser,setIsLoading,setIsError, isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
