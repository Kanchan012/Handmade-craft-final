import { apiClient } from "./apiClient";

export const getAllOrder = () => {
  return apiClient('/api/order/totalOrders');
};
