import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function Profile() {
  const navigate = useNavigate();
  const { isLoading, user, isError } = useContext(AuthContext);

  // console.log(user.user);
  if (isLoading)
    return <p className="text-center mt-5">Loading user details...</p>;
  if (isError) return <p className="text-red-500 text-center mt-5">error</p>;
  if (!user) return <p className="text-center mt-5">User not found.</p>;

  return (
    <div className="p-10 bg-amber-50">
    <div className="shadow-lg shadow-black bg-amber-100 rounded-2xl w-[800px] ml-80 p-10 ">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="flex flex-col items-center">
        {user.user?.image ? (
          <img
            src={`http://localhost:9000/image/${user.user?.image}`}
            alt={user.user.name}
            className="w-32 h-32 rounded-full mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-2">{user.user?.name}</h2>
        <p className="text-gray-600 mb-4">{user.user?.email}</p>
        {user.user?.phone && (
          <div className="w-full text-left">
            <p className="mb-1">
              <span className="font-semibold">Phone:</span>{" "}
              {user.user?.phone || "-"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Address:</span>{" "}
              {user.user?.address || "-"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span>{" "}
              {user.user?.city || "-"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Country:</span>{" "}
              {user.user?.country || "-"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Postcode:</span>{" "}
              {user.user?.postcode || "-"}
            </p>
          </div>
        )}

        <p className="mb-1 flex gap-3">
          <span className="font-semibold ">Status: </span>{" "}
          {user.user?.isActive ? (
            <span className=" text-green-400"> Active </span>
          ) : (
            "Inactive"
          )}
        </p>
        <p className="mb-1 text-gray-500 text-sm">
          Created at: {new Date(user.user?.createdAt).toLocaleString()}
        </p>
        <p className="mb-1 text-gray-500 text-sm">
          Updated at: {new Date(user.user?.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
    </div>
  );
}

export default Profile;
