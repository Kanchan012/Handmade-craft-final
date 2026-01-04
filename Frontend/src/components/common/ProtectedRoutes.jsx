import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
   const navigate= useNavigate()
  const { user, isLoading } = useContext(AuthContext);
  console.log("USER:", user);
  console.log("LOADING:", isLoading);
  useEffect(() => {
    // 1️⃣ Wait until auth check finishes
    if (isLoading) {
      return <div>Loading...</div>;
    }
    // 2️⃣ Not logged in → redirect
    if (!user) {
      return navigate('/login');
    }
  }, [user,navigate]);
  // 3️⃣ Logged in → allow access
  return children;
}

export default ProtectedRoutes;
