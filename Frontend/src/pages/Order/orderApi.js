import { apiClient } from "../../api/apiClient";

export const getAllOrder = () => apiClient("/api/products");
