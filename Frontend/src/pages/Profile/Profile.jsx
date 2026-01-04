import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Profile() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-blue-100">Account information</p>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">


          <div>
            <img
              className="w-20 h-20 rounded-full "
              src={`http://localhost:9000/image/${user?.image}`}
              alt=""
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Full Name</label>
            <p className="text-lg font-medium text-gray-800">
              {user.name || "N/A"}
            </p>
          </div>
          

          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <p className="text-lg font-medium text-gray-800">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">User ID</label>
            <p className="text-sm text-gray-600 break-all">{user._id}</p>
          </div>

          <div className="flex gap-x-3">
            <label className="block text-sm text-gray-500"> Role:</label>
            <p className="text-sm bg-gray-300   h-5 text-gray-600 break-all">
              {user.role.toUpperCase()}
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">
              Account Status
            </label>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
