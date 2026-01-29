import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient"; // your global API handler

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient(`/api/user/get/${id}`); // GET single user by id
        setUser(res.user); // assuming res.user contains user object
      } catch (err) {
        setError(err?.user?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading user details...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;
  if (!user) return <p className="text-center mt-5">User not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-5">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="flex flex-col items-center">
        {user.image ? (
          <img
            src="https://file.aiquickdraw.com/imgcompressed/img/compressed_fd416ceab31a0ff606e78f5cd234beb8.webp"
            alt={user.name}
            className="w-32 h-32 rounded-full mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>

        <div className="w-full text-left">
          <p className="mb-1"><span className="font-semibold">Phone:</span> {user.phone || "-"}</p>
          <p className="mb-1"><span className="font-semibold">Address:</span> {user.address || "-"}</p>
          <p className="mb-1"><span className="font-semibold">City:</span> {user.city || "-"}</p>
          <p className="mb-1"><span className="font-semibold">Country:</span> {user.country || "-"}</p>
          <p className="mb-1"><span className="font-semibold">Postcode:</span> {user.postcode || "-"}</p>
          <p className="mb-1"><span className="font-semibold">Status:</span> {user.isActive ? "Active" : "Inactive"}</p>
          <p className="mb-1 text-gray-500 text-sm">Created at: {new Date(user.createdAt).toLocaleString()}</p>
          <p className="mb-1 text-gray-500 text-sm">Updated at: {new Date(user.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
