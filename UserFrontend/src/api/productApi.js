import fetchData from "./apiClient"
export const getAllProduct=()=>{
    return fetchData('/api/product/get')
}