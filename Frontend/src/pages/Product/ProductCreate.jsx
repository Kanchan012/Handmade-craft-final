import React, { useState } from "react";
import { apiClient } from "../../api/apiClient";

function ProductCreate() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      const numericFields = ["costPrice", "sellingPrice", "quantity"];
      setFormData((prev) => ({
        ...prev,
        [name]: numericFields.includes(name) ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("brand", formData.brand);
      fd.append("category", formData.category);
      fd.append("costPrice", formData.costPrice);
      fd.append("sellingPrice", formData.sellingPrice);
      fd.append("quantity", formData.quantity);
      fd.append("image", formData.image);

      const response = await apiClient("/api/product/create", {
        method: "POST",
        body: fd, // IMPORTANT
      });

      setMessage("✅ Product created successfully!");
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        quantity: "",
        image: null,
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>

      {message && (
        <div className="mb-4 text-sm font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required className="border p-2 rounded" />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="costPrice" placeholder="Cost Price" value={formData.costPrice} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="sellingPrice" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required className="border p-2 rounded" />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="border p-2 rounded col-span-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded col-span-2"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductCreate;
