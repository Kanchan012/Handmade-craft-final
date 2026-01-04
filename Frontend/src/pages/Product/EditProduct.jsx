import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔵 FETCH PRODUCT BY ID
  const fetchProduct = async () => {
    try {
      const res = await apiClient(`/api/product/${id}`, {
        method: "GET",
      });

      setFormData({
        name: res.data.name || "",
        brand: res.data.brand || "",
        category: res.data.category || "",
        costPrice: res.data.costPrice || "",
        sellingPrice: res.data.sellingPrice || "",
        quantity: res.data.quantity || "",
      });
    } catch (err) {
      setError("Failed to load product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // 🟢 HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟠 UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient(`/api/product/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

     navigate("/product/productList"); // change if your list route is different
    } catch (err) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        ✏️ Edit Product
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="costPrice"
          placeholder="Cost Price"
          value={formData.costPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
