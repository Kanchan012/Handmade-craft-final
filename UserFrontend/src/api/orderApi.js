import fetchData from "./apiClient"
export const getAllOrder=()=>{
    return fetchData('/api/order/get')
}


export const getOrderItemById = (id) => {
  return  fetchData(`/api/order/get/${id}`,{
    credentials:"include"
  });
};
