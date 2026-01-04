const baseUrl="http://localhost:9000"

const fetchData=async (endPoint,option={})=>{
    console.log(option)
    let res=await fetch(`${baseUrl}${endPoint}`,option)
    return res.json()

}


export default fetchData;