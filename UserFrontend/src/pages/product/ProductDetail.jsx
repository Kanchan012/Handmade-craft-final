import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../../hooks/useCart";
import fetchData from "../../api/apiClient";
import { useState } from "react";
function ProductDetail() {
  const location = useLocation();
   const [qty]=useState(1)
  const { state } = location;
  console.log(state);
   const Navigate=useNavigate()

  const addToCart = async () => {
    let res = await fetchData("/api/cart/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({ productId: state._id, quantity: 1 }),
      credentials: "include", // 🍪 IMPORTANT
    });

    console.log(res);
    alert(res?.message);
  };
  return (
    <div className=" p-1 ">
      <div className=" flex w-[90%]  m-auto bg-white  p-2 mt-10  ">
        <div className=" p-5">
          <img
            className="w-96 "
            src={`http://localhost:9000/image/${state.image}`}
            alt="p_image"
          />
        </div>
        <div className=" p-5 mt-25 space-y-2">
          <h1 className="text-3xl">{state.name}</h1>
          <p>{state.description}</p>
          <div className="flex items-center text-l">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= (state.rating || 4) ? "text-yellow-500" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
          <p>Rs.{state.sellingPrice}</p>

          <div className="space-x-3">
            <button
             className="bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition w-50 p-3"
               onClick={()=>{
              Navigate('/payment', { state:{ order:{ totalAmount: qty * state.costPrice } }})
            }}>
              Buy Now
              </button>
            <button
              className="w-50 p-3 bg-red-500 text-amber-50 font-bold rounded-2xl hover:bg-red-600 transition"
              onClick={() => {
                addToCart();
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10 w-[90%] m-auto p-5">
        <h1 className="text-2xl">Brand{state.brand}</h1>
        <h1 className="font-serif">description:{state.description}</h1>
        <h1 className="font-serif">category:{state.category}</h1>
      </div>
    </div>
  );
}

export default ProductDetail;
