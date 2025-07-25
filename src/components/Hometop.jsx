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
      <div className="w-[80%] mx-auto flex">
        {/* Sidebar */}
        <div className="w-[20%] max-h-[60vh] overflow-y-scroll border-r-1 border-gray-300">
          <ul className="flex flex-col gap-5 overflow-visible">
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
                    <AiOutlineRight className="inline" />
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

        {/* Flash Tab Section */}
        <div className="bg-black w-full m-3 mb-0 z-0 text-white max-h-[60vh] relative">
          <div className="flex justify-between items-center w-[80%] mx-auto">
            <div className="max-w-[40%] space-y-6 m-10">
              <div className="flex space-x-3 items-center">
                <img src={tab.logo} alt="Logo" className="w-10 h-10" />
                <p>{tab.name}</p>
              </div>
              <p className="font-inter font-semibold text-[40px]">
                {tab.description}
              </p>
              <NavLink to="#" className="underline">
                {t("shopNow")}
                <img src={Arrow} alt="Arrow" className="w-3 h-3 inline ml-2" />
              </NavLink>
            </div>
            <div>
              <img src={tab.image} alt="promo" className="w-70 h-70 mt-4" />
            </div>
          </div>
          <div className="space-x-4 flex justify-center mb-10 absolute bottom-3 left-0 right-0">
            {tabs.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition duration-200 border-1 ${
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
