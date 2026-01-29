import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient"; // your global API handler
import { useNavigate } from "react-router-dom";

function ListOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiClient("/api/order"); // GET all orders
        setOrders(res.orders || []); // assuming res.orders is an array
      } catch (err) {
        setError(err?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-semibold mb-5">List of Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">User</th>
                <th className="py-2 px-4 border-b text-left">Payment Method</th>
                <th className="py-2 px-4 border-b text-left">Payment Status</th>
                <th className="py-2 px-4 border-b text-left">Delivery Status</th>
                <th className="py-2 px-4 border-b text-left">Total Amount</th>
                <th className="py-2 px-4 border-b text-left">Shipping Address</th>
                <th className="py-2 px-4 border-b text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/order/orderDetail/${order._id}`)} // optional detail page
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {order.userId ? order.userId.name : "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">{order.paymentMethods}</td>
                  <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                  <td className="py-2 px-4 border-b">
                    {order.paymentStatus?.toLowerCase() === "completed" || order.paymentStatus === "COMPLETE" ? (
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                  <td className="py-2 px-4 border-b">{order.shippingAddress}</td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.productId ? item.productId.name : "Unknown"} - {item.quantity} x {item.price}
                          </li>
                        ))
                      ) : (
                        <li>No items</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListOrder;
