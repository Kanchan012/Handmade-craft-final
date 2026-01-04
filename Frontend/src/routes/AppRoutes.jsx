import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Order from "../pages/Order/Order";
// import Product from "../pages/Product/Product";
import EditProduct from "../pages/Product/EditProduct";
import User from "../pages/User/User";
import Chat from "../pages/Chat/Chat";
import Profile from "../pages/Profile/Profile";
import Notification from "../pages/Notification/Notification";
import ProductList from "../pages/Product/ProductList";
import ProductCreate from "../pages/Product/ProductCreate";
import EditOrder from "../pages/Order/EditOrder";
import ListOrder from "../pages/Order/ListOrder";
import CreateOrder from "../pages/Order/CreateOrder";
import CreateUser from "../pages/User/CreateUser";
import ListUser from "../pages/User/ListUser";
import EditUser from "../pages/User/EditUser";
import UserDetail from "../pages/User/UserDetail";
import OrderDetail from "../pages/Order/OrderDetail";
import ManageLogo from "../pages/ManageLogo/ManageLogo";
import ManageSliderImage from "../pages/ManageSliderImage/ManageSliderImage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ProtectedRoutes from "../components/common/ProtectedRoutes";

function AppRoutes() {
  return (
    <div className="p-1 bg-gray-200 min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        {/* Product */}
        <Route path="/product/productList" element={<ProductList />} />
        <Route path="/product/productCreate" element={<ProductCreate />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />

        {/* Order */}
        <Route path="/order" element={<Order />} />
        <Route path="/order/editOrder" element={<EditOrder />} />
        <Route path="/order/listOrder" element={<ListOrder />} />
        <Route path="/order/createOrder" element={<CreateOrder />} />
        <Route path="/order/orderDetail/:id" element={<OrderDetail />} />
        {/* Users */}
        <Route path="/user" element={<User />} />
        <Route path="/user/editUser" element={<EditUser />} />
        <Route path="/user/createUser" element={<CreateUser />} />
        <Route path="/user/listUser" element={<ListUser />} />
        <Route path="/user/userDetail/:id" element={<UserDetail />} />
        {/* Chat */}
        <Route path="/chat" element={<Chat />} />
        {/* profile */}
        <Route path="/profile" element={<Profile />} />
        {/* Notification */}
        <Route path="/notification" element={<Notification />} />

        {/* ManageLogo */}

        <Route path="/manageLogo" element={<ManageLogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manageSliderImage" element={<ManageSliderImage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
