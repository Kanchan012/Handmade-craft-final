import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../api/productApi";

export const useAllProduct = () => {
  return useQuery({
    queryKey: ["fetchAllProduct"],
    queryFn:getAllProduct
  });

};
