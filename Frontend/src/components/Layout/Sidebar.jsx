import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../context/MenuProvider";
import { Collapse } from "react-collapse";
import { AiOutlineProduct } from "react-icons/ai";
import { FaLuggageCart } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { IoLogoWechat } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoChevronUp } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { SiManageiq } from "react-icons/si";

function Sidebar() {
  const { isMenuToggle } = useContext(MenuContext);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  return (
    <div
      className={` transition-all duration-300   shadow-gray-400 flex gap-2 flex-col   min-h-screen
        
        ${isMenuToggle ? "w-0 overflow-hidden " : "w-64 p-5 "}
        `}
    >
      <NavLink className="pl-2  gap-2 items-center flex" to="/">
        <MdDashboard />
        <p>Dashboard </p>
      </NavLink>
      <div className="">
        <button
          className="bg-gray-100 flex justify-between gap-3 p-2 text-start w-48"
          onClick={() => {
            setIsProductOpen(!isProductOpen);
          }}
        >
          <p className="flex items-center gap-2">
            <AiOutlineProduct />
            Products
          </p>

          <p> {isProductOpen ? <GoChevronUp /> : <MdKeyboardArrowDown />}</p>
        </button>
        <Collapse isOpened={isProductOpen}>
          <ol className=" ml-8  text-md">
            <li className="list-disc">
              <NavLink to="/product/productList">List</NavLink>
            </li>
            <li className="list-disc">
              <NavLink to="/product/productCreate">Create</NavLink>
            </li>
            {/* <li className="list-disc">
              <NavLink to="/product/productEdit">Edit</NavLink>
            </li> */}
          </ol>
        </Collapse>
      </div>

      {/* Orders */}
      <div className="">
        <button
          className="bg-gray-100 flex justify-between gap-3 p-2 text-start w-48"
          onClick={() => {
            setIsOrderOpen(!isOrderOpen);
          }}
        >
          <p className="flex items-center gap-2">
            <FaLuggageCart />
            Orders
          </p>
          <p> {isOrderOpen ? <GoChevronUp /> : <MdKeyboardArrowDown />}</p>
        </button>
        <Collapse isOpened={isOrderOpen}>
          <ol className=" ml-8  text-md">
            <li className="list-disc">
              <NavLink to="/order/listOrder">List</NavLink>
            </li>
            {/* <li className="list-disc">
              <NavLink to="/order/createOrder">Create</NavLink>
            </li> */}
            {/* <li className="list-disc">
              <NavLink to="/order/editOrder">Edit</NavLink>
            </li> */}
          </ol>
        </Collapse>
      </div>

      {/* Users */}
      <div className="">
        <button
          className="bg-gray-100 flex justify-between gap-3 p-2 text-start w-48"
          onClick={() => {
            setIsUserOpen(!isUserOpen);
          }}
        >
          <p className="flex items-center gap-2">
            <HiUsers />
            Users
          </p>
          <p> {isUserOpen ? <GoChevronUp /> : <MdKeyboardArrowDown />}</p>
        </button>
        <Collapse isOpened={isUserOpen}>
          <ol className=" ml-8   text-md">
            <li className="list-disc">
              <NavLink to="/user/listUser">List</NavLink>
            </li>
{/* 
            <li className="list-disc">
              <NavLink to="user/createUser">Create</NavLink>
            </li>
            <li className="list-disc">
              <NavLink to="/user/editUser">Edit</NavLink>
            </li> */}
          </ol>
        </Collapse>
      </div>

      <NavLink className="pl-2 flex  gap-2 items-center " to="/chat">
        <IoLogoWechat />
        <p> Chat </p>
      </NavLink>

      <NavLink className="pl-2 flex  gap-2 items-center " to="/manageLogo">
        <SiNginxproxymanager />
        <p> ManageLogo </p>
      </NavLink>

      <NavLink className="pl-2 flex  gap-2 items-center " to="/manageSliderImage">
        <SiManageiq />
        <p> ManageSliderImage </p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
