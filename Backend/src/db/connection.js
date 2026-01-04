import mongoose from "mongoose";


const connectDb=async()=>{
    await mongoose.connect("mongodb://localhost:27017/ecommerce-dashboard")
    console.log("Data base is connected")
}


export default connectDb;