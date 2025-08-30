import { useState, useEffect, useRef } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineCloseCircle,
  AiOutlineStar,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/Authstore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useLocation } from "react-router";
import "../I18n";

function Nav() {
  const { user, setUser, wishlist, cartItems } = useAuthStore();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const hideIcons = ["/signup"].includes(location.pathname);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownRef.current && !(dropdownRef.current).contains()) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Top bar */}
      <div className="bg-black text-white h-[40px] flex justify-center space-x-10 items-center px-4 sm:px-10">
        <p className="hidden sm:block text-sm">
          {t("summerSale")}
          <NavLink to="#" className="underline ml-3">
            {t("shopNow")}
          </NavLink>
        </p>
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="rounded bg-black outline-0 text-sm "
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Navbar */}
      <div className="border-b border-gray-300 mt-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[60px]">
          {/* Logo */}
          <p className="font-extrabold text-lg cursor-default">{t("exclusive")}</p>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            <NavLink to="/" className="hover:underline font-semibold">
              {t("home")}
            </NavLink>
            <NavLink to="/About" className="hover:underline font-semibold">
              {t("about")}
            </NavLink>
            <NavLink to="/Contact" className="hover:underline font-semibold">
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

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-gray-200 w-[180px] md:w-[250px] rounded px-2 relative">
              <input
                type="text"
                placeholder={t("search") || "Search..."}
                className="w-full outline-none px-2 py-1 bg-transparent text-sm"
              />
              <AiOutlineSearch size={20} className="absolute right-2 top-2" />
            </div>

            {!hideIcons && (
              <>
                {/* Wishlist */}
                <div className="relative">
                  <NavLink to="/Wishlist" aria-label="Wishlist">
                    <AiOutlineHeart size={24} />
                  </NavLink>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </div>

                {/* Cart */}
                <div className="relative">
                  <NavLink to="/CartPage" aria-label="Cart">
                    <AiOutlineShoppingCart size={24} />
                  </NavLink>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </div>

                {/* User Dropdown */}
                {user && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className={`p-1 rounded-full transition-colors ${
                        dropdownOpen ? "bg-red-600 text-white" : "text-gray-700"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <AiOutlineUser size={24} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-[-200%] md:right-0 top-8 bg-black/50 text-white rounded shadow-lg z-50 w-[220px] p-3 space-y-2">
                        <NavLink to="/UserAccount" className="flex gap-2 hover:bg-gray-600 p-2 rounded">
                          <AiOutlineUser size={20} /> Manage My Account
                        </NavLink>
                        <button className="flex gap-2 hover:bg-gray-600 p-2 rounded w-full text-left">
                          <AiOutlineShopping size={20} /> My Order
                        </button>
                        <button className="flex gap-2 hover:bg-gray-600 p-2 rounded w-full text-left">
                          <AiOutlineCloseCircle size={20} /> My Cancellation
                        </button>
                        <button className="flex gap-2 hover:bg-gray-600 p-2 rounded w-full text-left">
                          <AiOutlineStar size={20} /> My Reviews
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex gap-2 hover:bg-gray-600 p-2 rounded w-full text-left"
                        >
                          <AiOutlineLogout size={20} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AiOutlineMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-black flex flex-col gap-4 p-4">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              {t("home")}
            </NavLink>
            <NavLink to="/About" onClick={() => setMobileMenuOpen(false)}>
              {t("about")}
            </NavLink>
            <NavLink to="/Contact" onClick={() => setMobileMenuOpen(false)}>
              {t("contact")}
            </NavLink>
            {!user && (
              <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)}>
                {t("signUp")}
              </NavLink>
            )}
            <div className="flex items-center bg-gray-200 rounded px-2">
              <input
                type="text"
                placeholder={t("search") || "Search..."}
                className="w-full outline-none px-2 py-1 bg-transparent text-sm"
              />
              <AiOutlineSearch size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;