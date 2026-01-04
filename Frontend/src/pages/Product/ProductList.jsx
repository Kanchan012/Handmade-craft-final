import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiClient("/api/product/get", {
        method: "GET",
      });
      setProducts(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient(`/api/product/delete/${id}`, {
        method: "DELETE",
      });
      fetchProducts(); // refresh list
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  // 🔵 EDIT PRODUCT
  const handleEdit = (id) => {
    navigate(`/product/edit/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (!products.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No products found</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-700">
        📦 Product List
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2">Sn.</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Cost Price</th>
            <th className="border p-2">Selling Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={p._id} className="hover:bg-gray-50 text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <img
                  className="w-16 mx-auto"
                  src={`http://localhost:9000/image/${p.image}`}
                  alt=""
                />
              </td>
              <td className="border p-2 font-medium text-blue-600">
                {p.name}
              </td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.costPrice}</td>
              <td className="border p-2">{p.sellingPrice}</td>
              <td className="border p-2">{p.quantity}</td>

              {/* ACTION */}
              <td className="border p-2 space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={() => handleEdit(p._id)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
