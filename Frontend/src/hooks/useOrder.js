import { useQuery } from "@tanstack/react-query";
import { getAllOrder } from "../api/orderApi";

export const useOrder = () => {
  const getAllOrders = useQuery({
    queryKey: ["useGetAllOrder"],
    queryFn: getAllOrder,
  });

  return {
    getAllOrders,
  };
};
