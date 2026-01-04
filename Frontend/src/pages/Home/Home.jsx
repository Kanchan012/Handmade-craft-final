import { AiFillDollarCircle } from "react-icons/ai";
import { LuStore } from "react-icons/lu";
import CircleProgress from "../../components/Ui/CircleProgress";
import TopProducts from "./componenets/TopProducts";
import RecentTable from "./componenets/RecentTable";
import LineChart from "./componenets/LineChart";
import LineCharts from "./componenets/LineChart";
import { FaUsers } from "react-icons/fa6";
import { useOrder } from "../../hooks/useOrder";

function Home() {
  const { getAllOrders } = useOrder();

  const { isLoading, data, isError } = getAllOrders;

  // console.log("this is from home ",data)
  console.log(data);
  // console.log(data,isError,isLoading)
  // console.log(data?.profitAmount)
  // console.log(data?.totalQuantity)
  // console.log(data?.recentOrders)

  return (
    <div className="rounded-2xl ">
      <div className=" rounded-2xl flex gap-5 m-5 p-1 ">
        <div className="w-[60%] rounded-2xl bg-white">
          <div className=" flex justify-between p-4">
            <h1 className="text-2xl font-bold">Overview</h1>
            {/* <select name="" id="">
              <option value="">Monthly</option>
              <option value="">Annually</option>
              <option value="">Weekly</option>
            </select> */}
          </div>
          <div className="bg-gray-100 m-5  rounded-2xl p-5 flex gap-8 justify-center  ">
            <div className="w-36 space-y-4 shadow-sm shadow-gray-400 bg-white p-3 h-40 rounded-2xl">
              <span className="bg-blue-300 rounded-full flex w-10 h-10 justify-center items-center">
                <AiFillDollarCircle size={"20px"} />
              </span>
              <p className="text-md">Total Profit</p>
              <h1 className="text-md font-bold">${data?.profitAmount}</h1>
            </div>
            <div className="w-36 space-y-4 shadow-sm shadow-gray-400 bg-white p-3 h-40 rounded-2xl">
              <span className="bg-blue-300 rounded-full flex w-10 h-10 justify-center items-center">
                <AiFillDollarCircle size={"20px"} />
              </span>
              <p className="text-md">Total Sell</p>
              <h1 className="text-md font-bold">${data?.totalSellAmount}</h1>
            </div>
            <div className="w-36 space-y-4 shadow-sm shadow-gray-400 bg-white p-3 h-40 rounded-2xl">
              <span className="bg-emerald-300 rounded-full flex w-10 h-10 justify-center items-center">
                <LuStore size={"20px"} />
              </span>
              <p className="text-md">Total Order</p>
              <h1 className="text-md font-bold">{data?.orderCount}</h1>
            </div>
            <div className="w-36 space-y-4 shadow-sm shadow-gray-400 bg-white p-3 h-40 rounded-2xl">
              <span className="bg-emerald-300 rounded-full flex w-10 h-10 justify-center items-center">
                <FaUsers size={"20px"} />
              </span>
              <p className="text-md">Total User</p>
              <h1 className="text-md font-bold">{data?.usersCount}</h1>
            </div>
          </div>
          <div className="">
            <LineCharts data={data?.allOrders} />
          </div>
        </div>
        <div className=" ml-5 space-y-5">
          <div className=" p-4 space-y-4 bg-white rounded-xl">
            <div className=" flex justify-between ">
              <h1 className="text-xl font-bold">Sales target</h1>
              {/* <select name="" id="">
                <option value="">Monthly</option>
                <option value="">Annually</option>
                <option value="">Weekly</option>
              </select> */}
            </div>
            <div className="flex justify-center gap-10 items-center ">
              <div>
                <h1>
                  {" "}
                  <span className="text-2xl font-bold">
                    {data?.totalQuantity}{" "}
                  </span>{" "}
                  / 2K Units
                </h1>
                <p>Made this month year</p>
              </div>
              <div className=" p-0 w-max">
                <CircleProgress totalQuantity={data?.totalQuantity} />
              </div>
            </div>
          </div>
          <div className="">
            <TopProducts items={data?.topProducts} />
          </div>
        </div>
      </div>
      <div className=" m-5">
        <RecentTable items={data?.recentOrders} />
      </div>
    </div>
  );
}

export default Home;
