import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    // 1️⃣ Still loading - wait for auth check to complete
    if (isLoading) {
      return;
    }
    // 2️⃣ Not logged in → redirect to login
    if (!user?.user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  // 3️⃣ Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  // 4️⃣ Not logged in - don't render children (will redirect via useEffect)
  if (!user?.user) {
    return null;
  }

  // 5️⃣ Logged in → allow access
  return children;
}

export default ProtectedRoutes;
