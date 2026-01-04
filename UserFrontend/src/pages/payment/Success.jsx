import { useParams } from "react-router-dom";
import { useOrderById } from "../../hooks/useOrder";

function Success() {
  const { id } = useParams();
  const { isError, isLoading, data } = useOrderById(id);

  if (isLoading)
    return <div className="text-center py-10">Loading payment info...</div>;

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to fetch order details.
      </div>
    );

  const order = data.order; // ✅ use data directly instead of data.order
  console.log(order)

  if (!order) return <p className="text-center">No order found</p>;

  return (
    <div className="min-h-96 bg-gray-200 pt-10">
      <div className="bg-white w-80 m-auto p-5 space-y-3 rounded shadow">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          ✅ Payment Successful
        </h1>

        <p>
          Status:{" "}
          <span className="text-orange-600 underline">
            {order.paymentStatus || "N/A"}
          </span>
        </p>

        <p>
          Total Amount (Rs.):{" "}
          <span className="text-orange-600 underline">
            {order.totalAmount?.toFixed(2) || "0.00"}
          </span>
        </p>

        <p>
          Transaction ID:{" "}
          <span className="text-orange-600 underline">{order._id}</span>
        </p>

        <div className="pt-3">
          <h2 className="font-semibold">Ordered Items:</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {order.items?.length ? (
              order.items.map((item) => (
                <li key={item._id}>
                  {
                    console.log(item)
                  }
                  {item.productId?.name || " Product"} × {item?.quantity}   </li>
              ))
            ) : (
              <li>No items found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Success;
