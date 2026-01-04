import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../api/apiClient";

function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // orderDetail

  const fetchOrder = async () => {
    try {
      const res = await fetchData(`/api/order/getOrderById`, {
        method: "GET",
        credentials: "include", // 🍪 IMPORTANT
      }); // GET single order
      setOrder(res.order); // assuming res.order contains the order object
    } catch (err) {
      setError(err?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
      {order.length > 0 ? (
        <>
          {order?.map((item,index) => {
            return (
              <div  key={index} >
                <div className="mb-4">
                  <p>
                    <span className="font-semibold">Order ID:</span> {item?._id}
                    

                  </p>

                  <p>
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {item?.paymentMethods}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span  className="  font-bold text-green-500" >                      {item?.paymentStatus}
 </span>
                  </p>
                  <p>
                    <span className="font-semibold">Total Amount:</span>{" "}
                    Rs.{item?.totalAmount}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping Address:</span>{" "}
                    {item?.shippingAddress}
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
                    {item && item?.items?.length > 0 ? (
                      item?.items?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">
                            {item.productId ? item.productId.name : "Unknown"}
                          </td>
                          <td className="py-2 px-4 border-b">{item.price}</td>
                          <td className="py-2 px-4 border-b">
                            {item.quantity}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="py-2 px-4 border-b text-center"
                          colSpan="4"
                        >
                          No items
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}
          
        </>
      ) : (
        <h1>Not Found </h1>
      )}
    </div>
  );
}

export default Order;
