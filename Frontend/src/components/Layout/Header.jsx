import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useContext, useState } from "react";
import { MenuContext } from "../../context/MenuProvider";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AuthContext } from "../../context/AuthProvider";

function Header() {
  const { user, setUser, setIsLoading, setIsError, isLoading, isError } =
    useContext(AuthContext);
  const { setIsMenuToggle, isMenuToggle } = useContext(MenuContext);

  const [open, setOpen] = useState(false); // ✅ NEW

  const logout = async () => {
    try {
      setIsLoading(true);
      let res = await fetch("http://localhost:9000/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        setIsLoading(false);
        setIsError(false);
        window.location.href = "/login";
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  return (
    <div className="shadow-sm ml-0.5 shadow-gray-300 p-4 flex items-center justify-between gap-5">
      {/* LEFT */}
      <div className="flex gap-5 items-center">
        <div onClick={() => setIsMenuToggle(!isMenuToggle)}>
          {isMenuToggle ? (
            <IoMenu size={25} />
          ) : (
            <HiOutlineMenuAlt2 size={25} />
          )}
        </div>

        <label className="flex gap-1 border items-center rounded-2xl p-1">
          <CiSearch size={25} />
          <input
            placeholder="Search......"
            className="outline-none rounded-2xl pl-2 p-1"
            type="text"
          />
        </label>
      </div>

      {/* RIGHT */}
      <div className="flex gap-5 items-center">
        <NavLink to="/notification">
          <IoIosNotifications size={25} />
        </NavLink>

        {/* PROFILE */}
        <div className="relative">
          <img
            onClick={() => setOpen(!open)} // ✅ toggle
            className="w-10 h-10 rounded-full cursor-pointer"
            src={`http://localhost:9000/image/${user?.image}`}
            alt="profile"
          />

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 z-50 bg-gray-500 text-white font-bold rounded-md shadow-lg w-36 p-3 space-y-2">
              {!isError && !isLoading && user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="block hover:bg-gray-600 px-2 py-1 rounded"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={logout}
                    className="w-full text-left hover:bg-gray-600 px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="block hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Login
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
