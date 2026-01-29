import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";

function CreateOrder() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [shippingAddress, setShippingAddress] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1, price: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch users and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await apiClient("/api/user/get");
        console.log(userRes.users)
        const productRes = await apiClient("/api/product/get");
        setUsers(userRes.users || []);
        setProducts(productRes.data || []);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load users or products");
      }
    };
    fetchData();
  }, []);

  // Update total whenever items change
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0),
      0
    );
    setTotalAmount(total);
  }, [items]);

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;

      // Auto-update price when product changes
      if (field === "productId") {
        const selectedProduct = products.find((p) => p._id === value);
        updated[index].price = selectedProduct ? selectedProduct.sellingPrice : 0;
      }

      return updated;
    });
  };

  const addItem = () => {
    setItems((prev) => [...prev, { productId: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: selectedUser,
      paymentMethods,
      totalAmount,
      paymentStatus,
      shippingAddress,
      items: items.map((i) => ({
        productId: i.productId,
        price: Number(i.price),
        quantity: Number(i.quantity),
      })),
    };

    setLoading(true);
    setMessage("");

    console.log(orderData)

    try {
      const res = await apiClient("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      setMessage("✅ Order created successfully!");
      console.log("Order Created:", res);

      // Reset form
      setSelectedUser("");
      setPaymentMethods("Cash");
      setPaymentStatus("Pending");
      setShippingAddress("");
      setItems([{ productId: "", quantity: 1, price: 0 }]);
      setTotalAmount(0);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Create New Order</h2>

      {message && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User */}
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        {/* Shipping Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Shipping Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter detailed shipping address (e.g., Kathmandu, District, Street, House No.)"
            required
            rows="3"
          />
          <p className="text-gray-500 text-sm mt-1">Please provide your complete address</p>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={paymentMethods}
            onChange={(e) => setPaymentMethods(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option>Cash</option>
            <option>Esewa</option>
            <option>Khalti</option>
            <option>Bank Transfer</option>
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold mb-2">Order Items</h3>
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 mb-2 items-center border p-2 rounded"
            >
              <select
                value={item.productId}
                onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                className="border border-gray-300 p-2 rounded col-span-2"
                required
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                className="border border-gray-300 p-2 rounded"
                placeholder="Qty"
                required
              />

              <input
                type="number"
                value={item.price}
                readOnly
                className="border border-gray-300 p-2 rounded"
                placeholder="Price"
              />

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white rounded px-2 py-1"
                disabled={items.length === 1}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
          >
            + Add Item
          </button>
        </div>

        {/* Total */}
        <div className="text-right font-bold text-lg mt-4">
          Total: Rs. {totalAmount}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition"
        >
          {loading ? "Saving..." : "Create Order"}
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
