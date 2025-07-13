import { useState, useEffect, useRef } from "react";
import {AiOutlineHeart,AiOutlineShoppingCart,AiOutlineSearch,AiOutlineUser,AiOutlineShopping, AiOutlineCloseCircle,AiOutlineStar,AiOutlineLogout} from "react-icons/ai";
import { NavLink, } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/Authstore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // make sure this is your Firebase config
import { useLocation } from "react-router";
import "../I18n";

function Nav() {
  const { user, setUser , wishlist, cartItems} = useAuthStore();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const navigate = useNavigate();

  const hideIcons = ["/signup"].includes(location.pathname);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // clear user from zustand
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="bg-black text-white h-[40px] flex">
        <div className="flex justify-end items-center w-[90%]">
          <p>
            {t("summerSale")}
            <NavLink to="#" className="underline ml-3">
              {t("shopNow")}
            </NavLink>
          </p>
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="ml-[25%] rounded bg-black outline-0"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      <div className="border-b-1 border-gray-300 mt-4">
        <div className="w-[80%] mx-auto flex justify-between items-center h-[50px]">
          <div>
            <p className="font-extrabold cursor-default">{t("exclusive")}</p>
          </div>

          <nav className="flex space-x-8">
            <NavLink to="/" className="hover:underline font-semibold">
              {t("home")}
            </NavLink>
            <NavLink to="/about" className="hover:underline font-semibold">
              {t("about")}
            </NavLink>
            <NavLink to="/contact" className="hover:underline font-semibold">
              {t("contact")}
            </NavLink>
            {!user && (
              <NavLink
                to="/signup"
                className="rounded hover:underline font-semibold"
              >
                {t("signUp")}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center">
            <div className="flex items-center justify-center bg-gray-200 w-[200px] rounded px-2 ml-4 relative">
              <input
                type="text"
                placeholder={t("search") || "Search..."}
                className="outline-none px-2 py-1"
              />
              <button>
                <AiOutlineSearch
                  size={20}
                  className="absolute right-0 top-2 font-light"
                />
              </button>
            </div>

            {!hideIcons && (
              <>
          <div className="relative ml-4">
            <NavLink to="/Wishlist" aria-label="Wishlist">
              <AiOutlineHeart size={24} />
            </NavLink>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart with count */}
          <div className="relative ml-2">
            <NavLink to="/CartPage" aria-label="Cart">
              <AiOutlineShoppingCart size={24} />
            </NavLink>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
                          {user && (
                  <div className="relative ml-2 bg-red-600 rounded-full text-white h-7 w-7 flex justify-center items-center" ref={dropdownRef}>
                    <button
                      className="font-light"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <AiOutlineUser size={24} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-6 mt-2  bg-gray-500/20 backdrop-blur-md text-white border rounded shadow-lg z-50 space-y-3 w-[230px] p-3">
                        <button
                          className=" w-full text-left flex gap-3 hover:bg-gray-600"
                        >
                          <AiOutlineUser size={24} />
                          Manage My Account
                        </button>
                        <button className="w-full text-left flex gap-3 hover:bg-gray-600">
                          <AiOutlineShopping size={24} />
                          My Order
                        </button>
                        <button className="w-full text-left flex gap-3 hover:bg-gray-600">
                          <AiOutlineCloseCircle size={24} />
                          My Cancellation
                        </button>
                        <button className="w-full text-left flex gap-3 hover:bg-gray-600">
                          <AiOutlineStar size={24} />
                          My Reviews
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex gap-3 hover:bg-gray-600"
                        >
                          <AiOutlineLogout size={24} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;