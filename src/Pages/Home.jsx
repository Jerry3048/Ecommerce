import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../I18n";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Sections from "../components/Sections";

import { AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router";

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

function Home() {
  const { t } = useTranslation();

  // -----------------------------
  // Flash Sales Tabs (Auto-scroll)
  // -----------------------------
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

  const [activeTab, setActiveTab] = useState(0); // Tracks active promo tab
  const tab = tabs[activeTab];

  // Auto-switch tab every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  // -----------------------------
  // Category Menu (with optional subcategories)
  // -----------------------------
  const categories = [
    {
      name: t("womenFashion"),
      sub: [t("dresses"), t("tops"), t("shoes"), t("accessories")],
    },
    {
      name: t("menFashion"),
      sub: [t("shirts"), t("trousers"), t("shoes"), t("accessories")],
    },
    { name: t("electronics") },
    { name: t("homeLifestyle") },
    { name: t("medicine") },
    { name: t("sportOutdoor") },
    { name: t("babiesToys") },
    { name: t("groceriesPets") },
    { name: t("healthBeauty") },
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div>
      <Nav />

      {/* -----------------------------
          Sidebar Category & Flash Tab
      ------------------------------ */}
      <div className="w-[80%] mx-auto flex">
        {/* Sidebar with categories */}
        <ul className="flex flex-col gap-5 border-r-1 w-[20%] border-gray-300">
          {categories.map((cat, index) => (
            <li key={index} className="relative group">
              <button
                onClick={() => toggleMenu(index)}
                className="w-full text-left py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                {cat.name}
                {Array.isArray(cat.sub) && cat.sub.length > 0 && (
                  <AiOutlineRight className="inline" />
                )}
              </button>

              {/* Submenu for subcategories */}
              <ul
                className={`absolute left-full top-0 bg-white shadow-lg rounded z-50
                  ${activeMenu === index ? "block" : "hidden"}
                  group-hover:block`}
              >
                {Array.isArray(cat.sub) &&
                  cat.sub.map((subcat) => (
                    <li key={subcat} className="px-4 py-2 hover:bg-gray-200">
                      {subcat}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Flash Sales Tab Section */}
        <div className="bg-black w-full m-3 mb-0 z-0 text-white">
          <div className="flex justify-between items-center w-[80%] mx-auto">
            {/* Promo text and CTA */}
            <div className="max-w-[30%] space-y-6 m-10">
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

            {/* Product image */}
            <div>
              <img src={tab.image} alt="promo" className="w-70 h-70 mt-4" />
            </div>
          </div>

          {/* Dot navigation */}
          <div className="space-x-4 flex justify-center mb-10">
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

      <Sections/>

      <Footer />
    </div>
  );
}

export default Home;
