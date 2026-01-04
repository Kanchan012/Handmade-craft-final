import React from "react";
import { NavLink } from "react-router-dom";

function RecentTable({ items }) {
  // console.log(items);
  return (
    <div className="bg-white rounded-2xl">
      <div className="flex justify-between p-5">
        <h1 className="font-bold text-2xl">Recent Orders</h1>
        <button className="border p-3 rounded-2xl text-sm font-bold ">
          <NavLink to="/order/listOrder">View all order</NavLink>
        </button>
      </div>
      <div className=" p-1">
        <table className="w-[71vw]  m-5 p-5">
          <thead>
            <tr className="border-b  border-b-gray-300 ">
              <th className="p-3  text-start   w-20  ">Order </th>
              <th className="p-3  text-start   w-20  ">Status</th>
              <th className="p-3  text-start   w-20  ">Date</th>
              <th className="p-3  text-start   w-20  ">Customer</th>
              <th className="p-3  text-start   w-20  ">Amount spent</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((orders,index) => {
              return (
                <tr key={index} className="border-b border-b-gray-300    ">
                  <td className="p-3   w-20  ">#{orders._id}</td>
                  <td className="p-3 flex items-center gap-2  w-20  ">
                    <span className="bg-green-500 flex h-2 w-2 rounded-full"></span>
                    <span className=" font-bold text-green-500">{orders?.paymentStatus}</span>
                  </td>
                  <td className="p-3   w-20  ">{new Date(orders?.createdAt).toLocaleDateString()} </td>
                  <td className="p-3   w-20  ">{orders?.userId.name} </td>
                  <td className="p-3   w-20  ">${orders?.totalAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTable;
