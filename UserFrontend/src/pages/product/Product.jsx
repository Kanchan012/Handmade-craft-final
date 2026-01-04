import { useLocation, useNavigate } from "react-router-dom";
import { useAllProduct } from "../../hooks/useProduct";
import a1 from "../../assets/products/a1.png"
import a2 from "../../assets/products/a2.png"
import a3 from "../../assets/products/a3.png"
import a4 from "../../assets/products/a4.png"
import a5 from "../../assets/products/a5.png"
import a6 from "../../assets/products/a6.png"
import a7 from "../../assets/products/a7.png"
import a8 from "../../assets/products/a8.png"
import a9 from "../../assets/products/a9.png"
import a10 from "../../assets/products/a10.png"
import CategoryButton from "../../componenets/CategoryButton";

function Product() {
  const { isError, data, isLoading } = useAllProduct();
  console.log(isError, isLoading, data);

  const productList = data?.data;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathToCategory = {
    "/jewellery": "Jewellery",
    "/claycraft": "Clay-Craft",
    "/wood": "Wood-Craft",
    "/woolen": "Woolen",
  };

  const selectedCategory = pathToCategory[pathname];
  const visibleProducts = selectedCategory
    ? productList?.filter((p) => p.category === selectedCategory)
    : productList;

  return (
    <div className="p-6 bg-amber-50">
      <div>
        <h1 className="font-bold text-2xl italic text-center">
          Our Product Gallery
        </h1>

        <div className="grid grid-cols-5 gap-10 px-20 py-8">
          <img src={a1} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a2} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a3} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a4} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a5} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a6} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a7} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a8} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a9} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
          <img src={a10} alt="" className="w-60 h-60 object-cover border-8 border-white shadow-xl shadow-amber-200" />
        </div>
      </div>

      <div>
        <h1 className="font-bold text-2xl italic text-center mt-10">
          Categories
        </h1>
        <CategoryButton />
      </div>

      <div className="grid grid-cols-4 gap-6 mt-15 pl-25 justify-center">
        {visibleProducts?.map((item) => (
          <div
            key={item._id}
            className="bg-white w-60 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <div className="h-45 rounded-t-2xl overflow-hidden">
              <img
                className="h-full p-5 w-full object-cover"
                src={`http://localhost:9000/image/${item.image}`}
                alt="product_image"
              />
            </div>

            <hr />

            <div className="p-6 space-y-3">
              <h1 className="font-semibold text-sm truncate">
                {item.name}
              </h1>

              <div className="flex items-center text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (item.rating || 4)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <p className="font-bold text-red-600">
                  Rs.{item.sellingPrice}
                </p>
              </div>

              <button
                className="w-full font-bold bg-red-500 text-white text-sm py-2 rounded-full hover:bg-red-600 transition"
                onClick={() => {
                  navigate("/productDetail", { state: item });
                }}
              >
                Product Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
