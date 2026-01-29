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
        <Route path="/product/productList" element={<ProtectedRoutes><ProductList /></ProtectedRoutes>} />
        <Route path="/product/productCreate" element={<ProtectedRoutes><ProductCreate /></ProtectedRoutes>} />
        <Route path="/product/edit/:id" element={<ProtectedRoutes><EditProduct /></ProtectedRoutes>} />

        {/* Order */}
        <Route path="/order" element={<ProtectedRoutes><Order /></ProtectedRoutes>} />
        <Route path="/order/editOrder" element={<ProtectedRoutes><EditOrder /></ProtectedRoutes>} />
        <Route path="/order/listOrder" element={<ProtectedRoutes><ListOrder /></ProtectedRoutes>} />
        <Route path="/order/createOrder" element={<ProtectedRoutes><CreateOrder /></ProtectedRoutes>} />
        <Route path="/order/orderDetail/:id" element={<ProtectedRoutes><OrderDetail /></ProtectedRoutes>} />
        {/* Users */}
        <Route path="/user" element={<ProtectedRoutes><User /></ProtectedRoutes>} />
        <Route path="/user/editUser" element={<ProtectedRoutes><EditUser /></ProtectedRoutes>} />
        <Route path="/user/createUser" element={<ProtectedRoutes><CreateUser /></ProtectedRoutes>} />
        <Route path="/user/listUser" element={<ProtectedRoutes><ListUser /></ProtectedRoutes>} />
        <Route path="/user/userDetail/:id" element={<ProtectedRoutes><UserDetail /></ProtectedRoutes>} />
        {/* Chat */}
        <Route path="/chat" element={<ProtectedRoutes><Chat /></ProtectedRoutes>} />
        {/* profile */}
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        {/* Notification */}
        <Route path="/notification" element={<ProtectedRoutes><Notification /></ProtectedRoutes>} />

        {/* ManageLogo */}
        <Route path="/manageLogo" element={<ProtectedRoutes><ManageLogo /></ProtectedRoutes>} />
        <Route path="/manageSliderImage" element={<ProtectedRoutes><ManageSliderImage /></ProtectedRoutes>} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
