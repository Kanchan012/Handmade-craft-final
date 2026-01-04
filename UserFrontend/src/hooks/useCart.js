import { useQuery } from "@tanstack/react-query";
import {  getCartItem } from "../api/cartApi";

export const useCart=()=>{
     return useQuery({
    queryKey: ["fetchCartItem"],
    queryFn:getCartItem
  });

}