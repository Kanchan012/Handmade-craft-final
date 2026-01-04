import React, { useState } from "react";
import { apiClient } from "../../api/apiClient"; // your global API handler
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    postcode: "",
    image: "",
  });



  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value, // temporary image preview
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let res=await apiClient("/api/user/create", {
        method: "POST",
        headers:{
          'Content-Type':"Application/json"
        },
        body: JSON.stringify(formData),
      });
      console.log(res)
      setSuccess("User created successfully ✅");
      setTimeout(() => navigate("/user/listUser"), 1200);
    } catch (err) {
      setError(err?.data?.message || "Failed to create user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-semibold mb-5">Create New User</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-2">
          <label className="block mb-1 text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full border p-2 rounded"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block mb-1 text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            className="w-full border p-2 rounded"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 text-gray-600">Country</label>
          <input
            type="text"
            name="country"
            className="w-full border p-2 rounded"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 text-gray-600">City</label>
          <input
            type="text"
            name="city"
            className="w-full border p-2 rounded"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* Postcode */}
        <div>
          <label className="block mb-1 text-gray-600">Postcode</label>
          <input
            type="text"
            name="postcode"
            className="w-full border p-2 rounded"
            value={formData.postcode}
            onChange={handleChange}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 text-gray-600">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {formData.image && (
          <div className="col-span-2 mt-3">
            <img
              src={formData.image}
              alt="Preview"
              className="w-24 h-24 rounded-full border"
            />
          </div>
        )}

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
