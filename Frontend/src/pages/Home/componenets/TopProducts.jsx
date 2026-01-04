import { NavLink } from "react-router-dom";

function TopProducts({ items }) {
  return (
    <div className="p-2 bg-white rounded-2xl">
      <div className="flex justify-between p-3">
        <p className="font-bold">Top Products</p>
        <button className="border p-2 rounded-2xl text-sm font-bold w-20">
          <NavLink to="/product/productList">View all</NavLink>
        </button>
      </div>
      <div className=" space-y-2  pl-2 ">
        {items?.map((item,index) => {
          return (
            <div key={index} className=" text-md flex items-center p-1 gap-2 ">
              <div className="w-11 bg-gray-300 flex justify-center p-1">
                <img
                  className="w-8"
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
                  alt="Image"
                />
              </div>
              <div>
                <h1 className="font-bold">{item.name}</h1>
                <p className="text-sm">Sold: {item.totalSold}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopProducts;
