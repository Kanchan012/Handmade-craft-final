import React, { useState, useContext } from "react";
import { apiClient } from "../../../../Frontend/src/api/apiClient.js";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const { isLoading, setUser, setIsError, setIsLoading } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setIsLoading(true);

      const res = await apiClient("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      // ✅ CHECK LOGIN FAILURE
      if (!res || res.error) {
        throw new Error(res?.message || "Invalid email or password");
      }

      // ✅ LOGIN SUCCESS
      setUser(res);
      alert("✅ Login successful");
      window.location.href = "/";

    } catch (err) {
      setMessage(`❌ ${err.message}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-15 bg-amber-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>

        {message && (
          <p className="text-center mb-4 text-red-600 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded-xl"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
