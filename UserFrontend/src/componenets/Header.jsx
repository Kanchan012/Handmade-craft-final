import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { useCart } from "../hooks/useCart";
import { AuthContext } from "../context/AuthProvider";
import { apiClient } from "../../../Frontend/src/api/apiClient";
import Logo from "../assets/Logo.png";

function Header() {
  const { isLoading, user, setUser, setIsError, setIsLoading } =
    useContext(AuthContext);

  const logout = async () => {
    try {
      setIsLoading(true);
      let res = await apiClient("/api/user/logout", {
        method: "GET",
        credentials: "include",
      });

      console.log(res);
      setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useCart();
  const items = data?.items;
  const totalCartItems = items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const navLinks = [
    { name: "home", label: "Home", path: "/" },
    { name: "product", label: "Product", path: "/product" },
    { name: "about", label: "About", path: "/about" },
    { name: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-amber-400 text-black p-2 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-12 object-cover" />
          <h1 className="font-Pacifico text-2xl italic font-bold">
            Handmade Crafts
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex gap-15 text-xl font-serif">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 underline underline-offset-7 decoration-3 font-bold transition-colors "
                  : "text-black transition-colors "
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Search & Cart */}
        <div className="flex gap-6 items-center">
          <div className="flex items-center bg-white rounded-full px-2 py-1.5 shadow-sm shadow-[#6f6f6f]">
            <input
              type="text"
              placeholder="Search for anything"
              className="border-none outline-none text-[#585757] text-sm px-10 h-6 rounded-full"
            />
            <FaSearch className="text-black size-5" />
          </div>

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            {totalCartItems ? (
              <p className="bg-red-500 w-5 h-5 text-sm font-semibold text-center rounded-full absolute left-6 bottom-5">
                {totalCartItems}
              </p>
            ) : null}
            <FaCartShopping className="text-white size-8" />
          </NavLink>
        </div>

        {/* User Profile */}
        <div className="relative group">
          {!isLoading && user?.user ? (
            <img
              className="w-10 h-10 rounded-full "
              src={`http://localhost:9000/image/${user.user?.image}`}
              alt="user"
            />
          ) : (
            <img
              className="w-10 h-10 rounded-full "
              src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol.jpg"
              alt="user"
            />
          )}

          {/* Dropdown */}
          <div className="hidden group-hover:inline absolute right-0 mt-2 z-50 w-40 bg-gray-600 text-white rounded shadow-lg p-2">
            <div className="flex flex-col space-y-2">
              {user?.user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="hover:bg-gray-500 px-2 py-1 rounded"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/order"
                    className="hover:bg-gray-500 px-2 py-1 rounded"
                  >
                    Orders
                  </NavLink>
                  <button
                    className="bg-red-500 text-sm cursor-pointer p-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="hover:bg-gray-500 px-2 py-1 rounded"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="hover:bg-gray-500 px-2 py-1 rounded"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
