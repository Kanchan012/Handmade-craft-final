import { LuBotMessageSquare } from "react-icons/lu";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Chat from "./pages/chat/chat";
import Product from "./pages/product/Product";
import Header from "./componenets/Header";
import ProductDetail from "./pages/product/ProductDetail";
import Cart from "./pages/cart/Cart";
import Footer from "./componenets/Footer";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import Order from "./pages/order/Order";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/payment/Success";

function App() {
  return (
    <div className="">
      <Header />
      <div className="min-h-[500px] bg-gray-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/mostsale" element={<Home />} />
          <Route path="/jewellery" element={<Product />} />
          <Route path="/claycraft" element={<Product />} />
          <Route path="/wood" element={<Product />} />
          <Route path="/woolen" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="fixed right-5 bottom-5  rounded-full bg-gray-200">
        <NavLink to="/chat">
          <LuBotMessageSquare size={50} />
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}

export default App;
