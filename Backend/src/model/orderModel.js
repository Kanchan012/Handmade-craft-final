import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethods: {
    type: String,
  },
  totalAmount:{
    type:Number
  },
  paymentStatus:{
    type:String,
    enum:["COMPLETE","Pending","Paid","Failed"]
  },
  
  shippingAddress:{
    type:String,
  },
  items:[
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        price:{
            type:Number
        },
        quantity:{
            type:String
        }
    }
  ]

},{
    timestamps:true
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
