import fetchData from "./apiClient";

export const addCartItem = () => {
  return fetchData("/api/cart/add");
};
export const getCartItem = () => {
  return fetchData("/api/cart/get", {
    credentials: "include", // 🍪 IMPORTANT
  });
};
