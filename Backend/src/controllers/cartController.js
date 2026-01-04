import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

/**
 * 🛒 Add product to cart
 */
export const addToCart = async (req, res) => {
  let userId = req.user.id;
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price: product.sellingPrice }],
      });
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
      } else {
        // Add new product to items array
        cart.items.push({
          productId,
          quantity,
          price: product.price,
        });
      }
    }

    // Save cart (pre-save hook will calculate total)
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * 📦 Get cart by user ID
 */
export const getCartByUser = async (req, res) => {
    let userId = req.user.id;

  try {
    // const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * 🗑️ Remove product from cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * ✏️ Update product quantity in cart
 */
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, change } = req.body; // change = +1 or -1

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // increment / decrement
    item.quantity += change;

    // if quantity becomes 0 → remove item
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * 🧹 Clear the entire cart
 */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
