import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import facebook from "../assets/footer/facebook.png";
import instagram from "../assets/footer/instagram.png";
import youtube from "../assets/footer/youtube.png";
import pinInterest from "../assets/footer/pininterest.png";
import twitter from "../assets/footer/twiiter.png";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#2c2620] text-white py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {/* First Footer Part */}
        <div className="p-4 ml-30 ">
          <div className="flex items-center gap-1">
          <img src={Logo} alt="" className="w-10"/>
          <h1 className="font-RubikGemstones text-2xl">Handmade Crafts</h1>
          </div>
          <div className="mt-4">
            <div className="flex gap-2 items-center my-4">
              <span className="w-8 h-8 flex justify-center items-center border-2 border-[#BEBDBD] rounded-full">
                <IoLocation className="w-5 h-5 text-[#dfdfdf]" />
              </span>
              <p className="text-[#BEBDBD] text-sm">
               Jhaukhel-Bhaktapur,Nepal
              </p>
            </div>

            <div className="flex gap-2 items-center my-4">
              <span className="w-8 h-8 flex justify-center items-center border-2 border-[#BEBDBD] rounded-full">
                <FaPhoneAlt className="w-4 h-4 text-[#dfdfdf]" />
              </span>
              <p className="text-[#BEBDBD] text-sm">9800002011</p>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <span className="w-8 h-8 flex justify-center items-center border-2 border-[#BEBDBD] rounded-full">
                <FaEnvelope className="w-4 h-4 text-[#dfdfdf]" />
              </span>
              <p className="text-[#BEBDBD] text-sm">
                handmadecrafts@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Second Footer Part */}
        <div className="flex justify-around p-4">
          <div>
<h4 className="font-bold text-2xl mb-4">Links</h4>
          <div className="flex gap-3">
            <ul className="m-0 list-none flex flex-col gap-1">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Home
                </NavLink>
              </li>
                <li>
                <NavLink
                  to="/product"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
             </div>
          </div>
          

<div>
  <h4 className="font-bold text-2xl mb-4">Categories</h4>
<ul className="m-0 list-none flex flex-col gap-1">
              <li>
                <NavLink
                  to="/jewellery"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Jewellery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/claycraft"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Clay-Crafts
                </NavLink>
              </li>
               <li>
                <NavLink
                  to="/wood"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Wood-Crafts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/woolen"
                  className="hover:text-[#DEB133] text-[#bababa] text-sm font-semibold"
                >
                  Woolen
                </NavLink>
              </li>
            </ul>
</div>
            
         
        </div>

        {/* Third Footer Part */}
        <div className="p-4">
          <h4 className="font-bold text-2xl mb-4">FOLLOW US</h4>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="facebook" className="w-8 h-8 rounded-full" />
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="instagram" className="w-8 h-8 rounded-full" />
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <img src={youtube} alt="youtube" className="w-8 h-8 rounded-full" />
            </a>

            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
              <img src={pinInterest} alt="pininterest" className="w-8 h-8  rounded-full" />
            </a>

            <a href="https://x.com/?mx=2" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="twitter" className="w-8 h-8 rounded-full" />
            </a>
          </div>
        </div>
      </footer>

      {/* Bottom Copyright */}
      <div className="bg-[#000000] text-white py-3 text-center">
        <p>@ 2025 Handmade Crafts. All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
