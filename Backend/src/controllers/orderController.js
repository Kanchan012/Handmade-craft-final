import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

/**
 * 🔒 Checkout: convert cart items into an order
 */
export const checkout = async (req, res) => {
  let userId = req.user.id;

  try {
    const { paymentMethods, shippingAddress } = req.body;

    // 1️⃣ Get user cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    console.log(cart);
    if (!cart || cart.items?.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Validate stock
    for (const item of cart.items) {
      if (item.quantity > item.productId.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.productId.name}`,
        });
      }
    }

    // 3️⃣ Prepare order items using product sellingPrice
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      price: item.productId.sellingPrice,
      quantity: item.quantity,
    }));

    // 4️⃣ Calculate totalAmount
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 5️⃣ Create the order
    const order = new Order({
      userId,
      paymentMethods,
      shippingAddress,
      totalAmount,
      items: orderItems,
      paymentStatus: "Pending", // or "Paid" if payment is instant
    });
    await order.save();

    // 6️⃣ Reduce product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    // 7️⃣ Clear the cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: "Checkout successful, order created",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📦 Get all orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image");



      console.log(orders)
    res.status(200).json({ orders });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📄 Get single order by ID
 */
export const getOrderById = async (req, res) => {
  let id = req.user.id;
  console.log(id);
  try {
    // const { id } = req.params;
    const order = await Order.find({ userId: id })
      .populate("userId")
      .populate("items.productId");
    console.log(order);
    if (!order) return res.status(404).json({ message: "Order not found" });
    const totalAmount = order.reduce((acc, item) => {
      return acc + item.totalAmount;
    }, 0);
    // console.log(totalAmount)
    res.status(200).json({ order, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getOrderStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById({ _id: id }).populate("items.productId");

    console.log(order);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // console.log(totalAmount)
    res.status(200).json({ message: "found", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✏️ Update payment status
 */
export const updatePaymentStatus = async (req, res) => {
  // let id = "68f7786165b19c1f72a0efd2";
  let data = JSON.parse(atob(req.query.data));
  let paymentStatus = data.status;
  let id = data.transaction_uuid;
  // console.log(paymentStatus);

  try {
    if (!["Pending", "Paid", "Failed", "COMPLETE"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }
    const order = await Order.findByIdAndUpdate(
      {
        _id: id,
      },
      { paymentStatus },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    // console.log(order);
    // res.status(200).json({ message: "Payment status updated",order });
    res.redirect(`http://localhost:5173/success/${order._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🗑️ Delete order
 */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📊 Dashboard / Total Orders Stats
 */
export const totalOrders = async (req, res) => {
  try {
    // Only consider paid orders for revenue/profit
    const allOrders = await Order.find({ paymentStatus: "COMPLETE" }).populate(
      "items.productId"
    );

    // console.log(allOrders)

    let totalSellAmount = 0;
    let totalCostPrice = 0;
    let totalQuantity = 0;
    const topProducts = [];

    allOrders.forEach((order) => {
      totalSellAmount += order.totalAmount || 0;

      order.items.forEach((item) => {
        if (!item.productId) return;

        const selling = Number(item.price);
        const cost = Number(item.productId.costPrice || 0);
        const qty = Number(item.quantity);

        totalQuantity += qty;
        totalCostPrice += cost * qty;

        const existing = topProducts.find(
          (p) => p.productId.toString() === item.productId._id.toString()
        );

        if (existing) {
          existing.totalSold += qty;
          existing.totalRevenue += selling * qty;
          existing.totalCost += cost * qty;
        } else {
          topProducts.push({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.image,
            category: item.productId.category,
            totalSold: qty,
            totalRevenue: selling * qty,
            totalCost: cost * qty,
          });
        }
      });
    });

    topProducts.sort((a, b) => b.totalSold - a.totalSold);
    const top5Products = topProducts.slice(0, 5);
    const profitAmount = totalSellAmount - totalCostPrice;

    const orderCount = await Order.countDocuments();
    const usersCount = await User.countDocuments();

    const recentOrders = await Order.find({ paymentStatus: "COMPLETE" })
      .populate("userId", "name email")
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 })
      .limit(5);

    console.log(recentOrders);
    res.status(200).json({
      message: "Stats calculated successfully",
      orderCount,
      usersCount,
      totalQuantity,
      totalSellAmount,
      totalCostPrice,
      profitAmount,
      topProducts: top5Products,
      recentOrders,
      allOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const getOrderByOrderId=async (req,res)=>{
try {
    const { id } = req.params;
    const order = await Order.findById({ _id: id });
    console.log(order);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // console.log(totalAmount)
    res.status(200).json({ message: "found", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
