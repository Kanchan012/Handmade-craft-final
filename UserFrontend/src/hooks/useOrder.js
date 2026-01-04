import { useQuery } from "@tanstack/react-query";
import { getAllOrder, getOrderItemById } from "../api/orderApi";

export const useOrder=()=>{
     return useQuery({
    queryKey: ["fetchOrderItem"],
    queryFn:getAllOrder
  });

}



export const useOrderById = (id) => {
  return useQuery({
    queryKey: ["getOrderItemById", id], // include id in key
    queryFn: () => getOrderItemById(id),
    enabled: !!id, // only run when id is available
  });
};
