import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient"; // your global API handler
import { useNavigate } from "react-router-dom";

function ListUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient("/api/user/get"); // GET request
        console.log(res.user);
        setUsers(res.user || []); // assuming res.users is an array
      } catch (err) {
        setError(err?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-semibold mb-5">List of Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>
                <th className="py-2 px-4 border-b text-left">Address</th>
                <th className="py-2 px-4 border-b text-left">City</th>
                <th className="py-2 px-4 border-b text-left">Country</th>
                <th className="py-2 px-4 border-b text-left">Postcode</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/user/userDetail/${user._id}`)} // optional detail page
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {user.image ? (
                      <img
                                  src={`http://localhost:9000/image/${user?.image}`}

                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone || "-"}</td>
                  <td className="py-2 px-4 border-b">{user.address || "-"}</td>
                  <td className="py-2 px-4 border-b">{user.city || "-"}</td>
                  <td className="py-2 px-4 border-b">{user.country || "-"}</td>
                  <td className="py-2 px-4 border-b">{user.postcode || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListUser;
