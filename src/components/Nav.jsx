import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import "../I18n"; // Make sure i18n is initialized

function Nav() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div >
      <div className="bg-black text-white h-[40px] flex">
        <div className="flex justify-end items-center w-[90%] ">
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
            {/* Add more languages here if needed */}
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
                    <NavLink
                    to="/signup"
                    className="rounded hover:underline font-semibold">
                    {t("signUp")}
                    </NavLink>
                </nav>     
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-200 w-[200px] rounded px-2 ml-4 relative">
                <input
                  type="text"
                  placeholder={t("search") || "Search..."}
                  className="outline-none px-2 py-1 "
                />
                 <button>
                    <AiOutlineSearch size={20} className="absolute right-0 top-2 font-light " />
                </button>
              </div>
                <button className="ml-4 font-light" aria-label="Wishlist"> 
                  <AiOutlineHeart size={24} />
                </button>
                <button className="ml-2 font-light" aria-label="Cart">
                  <AiOutlineShoppingCart size={24} />
                </button>
                <button className="ml-2 font-light" aria-label="Account">
                  <AiOutlineUser size={24} />
                </button>
            </div>
        </div>
       </div>
    </div>
  );
}

export default Nav;