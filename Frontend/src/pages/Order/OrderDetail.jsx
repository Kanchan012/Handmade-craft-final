import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient"; // your global API handler

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// orderDetail

const fetchOrder = async () => {
      try {
        const res = await apiClient(`/api/order/getOrderByOrderId/${id}`); // GET single order
        console.log(res);
        setOrder(res.order); // assuming res.order contains the order object
      } catch (err) {
        setError(err?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    console.log(order)
  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading)
    return <p className="text-center mt-5">Loading order details...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;
  if (!order) return <p className="text-center mt-5">Order not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-5">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-semibold mb-3">Order Details</h2>

      <div className="mb-4">
        <p>
          <span className="font-semibold">Order ID:</span> {order._id}
        </p>
        <p>
          <span className="font-semibold">User:</span>{" "}
          {order.userId ? order.userId.name : "Unknown"}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {order.userId ? order.userId.email : "Unknown"}
        </p>
        <p>
          <span className="font-semibold">Payment Method:</span>{" "}
          {order.paymentMethods}
        </p>
        <p>
          <span className="font-semibold">Payment Status:</span>{" "}
          {order.paymentStatus}
        </p>
        <p>
          <span className="font-semibold">Total Amount:</span>{" "}
          {order.totalAmount}
        </p>
        <p>
          <span className="font-semibold">Shipping Address:</span>{" "}
          {order.shippingAddress}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <table className="min-w-full border border-gray-200 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Product</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {item.productId ? item.productId.name : "Unknown"}
                </td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b text-center" colSpan="4">
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="text-gray-500 text-sm">
        Created at: {new Date(order.createdAt).toLocaleString()} | Updated at:{" "}
        {new Date(order.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

export default OrderDetail;
