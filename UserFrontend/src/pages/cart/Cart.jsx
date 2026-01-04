import { useCart } from "../../hooks/useCart";
import fetchData from "../../api/apiClient";
import { NavLink, useNavigate } from "react-router-dom";
import cartimg from "../../assets/cart/cartimg.png"
function Cart() {
  const { data, isLoading, isError, refetch } = useCart();
  const navigate = useNavigate();

  /* ================= CART ACTIONS ================= */

  const incrementQty = async (productId) => {
    try {
      await fetchData("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          change: 1, // +1
        }),
      });
      refetch();
    } catch (error) {
      console.error("INCREMENT ERROR:", error);
    }
  };

  const decrementQty = async (productId) => {
    try {
      await fetchData("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          change: -1, // -1
        }),
      });
      refetch();
    } catch (error) {
      console.error("DECREMENT ERROR:", error);
    }
  };

  const deleteItem = async (productId) => {
    try {
      await fetchData("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      refetch();
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  /* ================= ORDER ================= */

  const orderNow = async () => {
    try {
      const res = await fetchData("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          paymentMethods: "e-sewa",
          shippingAddress: "KTM",
        }),
      });

      alert(res.message);
      navigate("/payment", { state: res });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error loading cart</p>;

  const items = data?.items || [];

  const totalPrice = items.reduce(
    (sum, item) => sum + item.productId.sellingPrice * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {items.length > 0 ? (
        <div className="flex justify-around pb-50 pt-10  bg-amber-100">
          <div className="w-[60%] space-y-2 ">
            {items.map((cart) => (
              <div
                key={cart._id}
                className="flex object-cover h-30 p-4 items-center justify-between rounded-lg shadow-2xl shadow-neutral-300 bg-white"
              >
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-25 h-25"
                    src={`http://localhost:9000/image/${cart.productId.image}`}
                    alt="product"
                  />

                  <div>
                    <h1 className="text-2xl">{cart.productId.name}</h1>
                  </div>
                </div>

                <div>
                  <p className="text-xl">
                    Rs.{cart.productId.sellingPrice}
                  </p>
                  <p className="line-through text-red-400">
                    Rs.{cart.productId.costPrice}
                  </p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => decrementQty(cart.productId._id)}
                    disabled={cart.quantity === 1}
                    className="w-9 h-9 bg-gray-200"
                  >
                    -
                  </button>

                  <span>{cart.quantity}</span>

                  <button
                    onClick={() => incrementQty(cart.productId._id)}
                    className="w-9 h-9 bg-gray-200"
                  >
                    +
                  </button>

                  <button
                    onClick={() => deleteItem(cart.productId._id)}
                    className="ml-2 text-white p-1 rounded-lg px-4 bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>


          <div className="bg-white p-4 w-96 h-80 space-y-6">
            <h1 className="text-2xl">Order Summary</h1>

            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>Rs.{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs.10</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs.{totalPrice + 10}</span>
            </div>

            <button
              onClick={orderNow}
              className="bg-orange-600 w-full p-3 text-white"
            >
              Order
            </button>
          </div>
        </div>
      ) : (
        <div className="w-96 m-auto p-10 text-center space-y-5">

          <h1 className="text-3xl text-gray-700 italic font-bold">
            There Are No Items In The Cart
          </h1>
           <img src={cartimg} alt=""  />
          <NavLink to="/product" className="text-xl bg-yellow-500 hover:bg-yellow-600 font-medium rounded-full p-2 px-6">
            Continue Shopping
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Cart;
