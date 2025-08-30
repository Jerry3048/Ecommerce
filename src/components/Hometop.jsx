import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../store/Productstore";
import "../I18n";
import { useNavigate } from "react-router"; // Fixed import

import { AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router"; // Fixed import

import Arrow from "/assets/arrow/rightarrowwhite.png";

// Product Logos & Images
import AppleLogo from "/assets/productimage/AppleLogo.png";
import Iphone14 from "/assets/productimage/Iphone14.png";
import SamsungLogo from "/assets/productimage/samsungLogo.png";
import S25 from "/assets/productimage/s25Image.webp";
import XiomiLogo from "/assets/productimage/XiomiLogo.png";
import Xiomi15 from "/assets/productimage/Xiomi15image.jpg";
import PixelLogo from "/assets/productimage/Pixel-logo.webp";
import Pixel19 from "/assets/productimage/pixel9image.jpg";
import HuwaweiLogo from "/assets/productimage/HuwaweiLogo.png";
import Huaweipura80 from "/assets/productimage/huaweipura80.jpg";

function Hometop() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    products,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useProductStore();

  // Generate category + subcategory map
  const categoryMap = {};
  products.forEach((product) => {
    const { category, subcategory } = product;
    if (!categoryMap[category]) {
      categoryMap[category] = new Set();
    }
    if (subcategory) {
      categoryMap[category].add(subcategory);
    }
  });

  const dynamicCategories = Object.entries(categoryMap).map(
    ([category, subSet]) => ({
      name: category,
      sub: Array.from(subSet),
    })
  );

  const [activeMenu, setActiveMenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const tabs = [
    {
      name: "iPhone 14 Series",
      description: t("iphone14Desc"),
      logo: AppleLogo,
      image: Iphone14,
    },
    {
      name: "Samsung Galaxy S23",
      description: t("samsungDesc"),
      logo: SamsungLogo,
      image: S25,
    },
    {
      name: "Pixel 19 Pro",
      description: t("pixelDesc"),
      logo: PixelLogo,
      image: Pixel19,
    },
    {
      name: "Huawei Pura 80 Series",
      description: t("huaweiDesc"),
      logo: HuwaweiLogo,
      image: Huaweipura80,
    },
    {
      name: "Xiaomi 15 Series",
      description: t("xiaomiDesc"),
      logo: XiomiLogo,
      image: Xiomi15,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  const tab = tabs[activeTab];

  return (
    <div>
      <div className="w-[95%] mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-[40%] lg:w-[30%]  xl7:w-[30%] w-full max-h-[60vh] overflow-y-scroll border-r-0 md:border-r-1 md:mr-2 border-gray-300">
          <ul className="flex flex-row md:flex-col gap-5 overflow-visible">
            {dynamicCategories.map((cat, index) => (
              <li
                key={index}
                onMouseOver={(e) => {
                  setActiveMenu(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setSubmenuPosition({ top: rect.top, left: rect.right });
                }}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative "
              >
                <button
                  onClick={() => {
                    toggleMenu(index);
                    setSelectedCategory(cat.name);
                    setSelectedSubcategory(null);
                    navigate(`/products/${encodeURIComponent(cat.name)}`);
                  }}
                  className={`w-full text-left p-2 flex items-center justify-between hover:bg-gray-100 ${
                    selectedCategory === cat.name ? "bg-gray-200 font-bold" : ""
                  }`}
                >
                  {cat.name}
                  {Array.isArray(cat.sub) && cat.sub.length > 0 && (
                    <AiOutlineRight className=" hidden md:inline" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Render submenu as a fixed element */}
        {activeMenu !== null &&
          Array.isArray(dynamicCategories[activeMenu]?.sub) &&
          dynamicCategories[activeMenu].sub.length > 0 && (
            <ul
              className="fixed bg-white shadow-lg rounded z-50 text-sm w-[150px]"
              style={{
                top: submenuPosition.top,
                left: submenuPosition.left,
              }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {dynamicCategories[activeMenu].sub.map((subcat) => (
                <li key={subcat} className="px-4 py-2 hover:bg-gray-200">
                  <button
                    onClick={() => {
                      setSelectedCategory(dynamicCategories[activeMenu].name);
                      setSelectedSubcategory(subcat);
                      navigate(
                        `/products/${encodeURIComponent(
                          dynamicCategories[activeMenu].name
                        )}/${encodeURIComponent(subcat)}`
                      );
                    }}
                    className="w-full text-left"
                  >
                    {subcat}
                  </button>
                </li>
              ))}
            </ul>
          )}

        <div className="bg-black w-full px-4 md:px-8 lg:px-12 text-white relative py-8">
          {/* Flex container */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-[80%] mx-auto">
            
            {/* Left content */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 mb-6 lg:mb-0 text-center lg:text-left">
              {/* Logo + Name */}
              <div className="flex justify-center lg:justify-start items-center space-x-3">
                <img src={tab.logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <p className="text-lg md:text-xl">{tab.name}</p>
              </div>

              {/* Description */}
              <p className="font-inter font-semibold text-2xl md:text-3xl lg:text-5xl leading-snug">
                {tab.description}
              </p>

              {/* CTA link */}
              <NavLink
                to="#"
                className="underline inline-flex items-center text-sm md:text-base"
              >
                {t("shopNow")}
                <img src={Arrow} alt="Arrow" className="w-3 h-3 inline ml-2" />
              </NavLink>
            </div>

            {/* Right content (Image) */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={tab.image}
                alt="promo"
                className="w-48 h-48 md:w-60 md:h-60 lg:w-80 lg:h-80 object-contain mt-4"
              />
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-3 mt-6 lg:mt-8 absolute bottom-3 left-0 right-0">
            {tabs.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition duration-200 border ${
                  activeTab === idx
                    ? "bg-red-700 border-white"
                    : "bg-gray-500 hover:bg-white/60"
                }`}
                onClick={() => setActiveTab(idx)}
                aria-label={`Show ${tabs[idx].name}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hometop;
