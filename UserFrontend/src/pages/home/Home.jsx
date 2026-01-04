import React, { useState } from 'react'
import font from "../../assets/home/font.png"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAllProduct } from "../../hooks/useProduct";
import show from "../../assets/homevideo/show.mp4"

function Home() {
  const { isError, data, isLoading } = useAllProduct();
  console.log(isError, isLoading, data);

  const productList = data?.data;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const PRODUCTS_LIMIT = 12;

  const mostSaleProducts = productList?.filter(
    (item) => item.category === "Most-sale"
  );

  const filteredProducts = selectedCategory
    ? productList?.filter((p) => p.category === selectedCategory)
    : productList;

  const visibleMostSaleProducts = showAll
    ? mostSaleProducts
    : mostSaleProducts?.slice(0, PRODUCTS_LIMIT);

  const visibleAllProducts = showAll
    ? filteredProducts
    : filteredProducts?.slice(0, PRODUCTS_LIMIT);

  return (
    <>
    <div className='bg-amber-50'>
      <div>
        <img
          src={font}
          alt=""
          className='w-full h-[400px] relative object-cover opacity-80'
        />
        <h1 className='absolute top-60 left-110 text-center font-RubikGemstones text-3xl'>
          Crafting is the art of turning ordinary <br />
          objects into extraordinary things.
        </h1>
        <button className="absolute top-88 left-160 rounded-full px-4 py-1 font-medium text-xl text-amber-50 bg-amber-600 hover:bg-amber-800">
          <NavLink to="/about">Explore More</NavLink>
        </button>
      </div>

      {/* ================= MOST SALES ================= */}
      <div className='mt-10 mb-10'>
        <h1 className='font-bold text-center text-2xl italic'>
          Most Sales Products
        </h1>

        <div className="grid grid-cols-4 gap-6 mt-15 ml-20 justify-center">
          {visibleMostSaleProducts?.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white w-70 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer"
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

                  <p className="font-bold text-red-600">
                    Rs.{item.sellingPrice}
                  </p>

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
            );
          })}
        </div>
      </div>

      {/* ================= VIDEO ================= */}
      <div className='p-8 ml-10 gap-8 flex justify-around'>
        <video
          src={show}
          autoPlay
          controls
          className='h-90 w-[600px] bg-amber-600'
        />
        <div className='w-[800px] mt-12 text-justify'>
          <h1 className='font-bold italic p-5 ml-40 text-2xl text-amber-900'>
            Explore The Way To Create Our Products
          </h1>
          <p className='font-medium mr-10'>
           At Handmade Crafts, every product you see is carefully made by skilled artisans with love, creativity, and attention to detail. Unlike mass-produced items, our handmade products are unique and carry a personal touch in every piece. Products are packed carefully to prevent damage during delivery. Each package reflects the care and love that went into making the product.
          </p>
        </div>
      </div>

      {/* ================= ALL PRODUCTS ================= */}
      <div>
        <h1 className='font-bold text-center mt-10 text-2xl italic'>
          Our Products
        </h1>

        <div className="grid grid-cols-4 space-y-8 pb-10 pl-25 mt-10 gap-3 justify-center">
          {visibleAllProducts?.map((item) => {
            return (
              <div
                key={item._id}
                className="shadow-2xl bg-white hover:shadow-sm shadow-gray-300 w-70 p-1 rounded-xl flex flex-col"
              >
                <div className='h-50'>
                  <img
                    className="rounded-xl h-full w-full object-cover p-2"
                    src={`http://localhost:9000/image/${item.image}`}
                    alt="product_image"
                  />
                </div>

                <hr />

                <div className="p-4 flex flex-col flex-grow">
                  <h1>{item.name}</h1>

                  <p className="font-bold">Rs.{item.sellingPrice}</p>

                  <button
                    className="mt-auto w-full font-bold bg-red-500 text-white text-sm py-2 rounded-full hover:bg-red-600 transition"
                    onClick={() => {
                      navigate("/productDetail", { state: item });
                    }}
                  >
                    Product Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Less */}
        {productList?.length > PRODUCTS_LIMIT && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-2 mb-8 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Home;
