import { useState, useEffect } from "react";
import RightArrow from "/assets/arrow/rightarrowblk.png";
import LeftArrow from "/assets/arrow/leftarrowblk.png";
import Card from "./Card";
import axios from "axios";
import { useRef } from "react";
import { FaShippingFast, FaHeadset, FaMoneyBillWave } from "react-icons/fa";
import { useProductStore } from "../store/ProductStore";
import Timer from "../components/Timer";

import {
  FaCamera,
  FaMobileAlt,
  FaDesktop,
  FaHeadphones,
  FaGamepad,
  FaTv,
  FaVolumeUp,
  FaClock,
  FaTshirt,
  FaShoePrints,
  FaHatCowboy,
  FaBlender,
  FaFan,
  FaMicrophone,
  FaSnowflake,
  FaRobot,
  FaCar,
  FaPuzzlePiece,
  FaBook,
  FaCalculator,
  FaPen,
  FaChild,
  FaLuggageCart,
  FaTabletAlt,
} from "react-icons/fa";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getBatches = (arr, size) => {
  const batches = [];
  for (let i = 0; i < arr.length; i += size) {
    batches.push(arr.slice(i, i + size));
  }
  return batches;
};

function Sections() {
  const {
    fetchProducts,
    flashCurrentBatch,
    nextFlashBatch,
    prevFlashBatch,
    nextProductBatch,
    prevProductBatch,
    productCurrentBatch,
    monthCurrentBatch,
    monthSingleBatch,
    loading,
    error,
    AllItems,
  } = useProductStore();

  const scrollRef = useRef(null);

  const [showAllFlash, setShowAllFlash] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categoryCurrentBatch, setCategoryCurrentBatch] = useState([]);
  const [categoryBatchIndex, setCategoryBatchIndex] = useState(0);
  const [categoryError, setCategoryError] = useState(null);
  const [showAllMonth, setShowAllMonth] = useState(false);
  const [showAllProduct, setShowAllProduct] = useState(false);

  // flash sales
  useEffect(() => {
    if (!showAllFlash) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
          if (
            scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
            scrollRef.current.scrollWidth
          ) {
            // Just reset scrollLeft to 0, do NOT change the batch
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [flashCurrentBatch, showAllFlash]);

  // Categories
  useEffect(() => {
    axios
      .get("/Goods/Categories.json")
      .then((res) => {
        const shuffled = shuffleArray(res.data);
        const batches = getBatches(shuffled, 6);
        setCategoryDetails(batches);
        setCategoryCurrentBatch(batches[0] || []);
      })

      .catch((err) => setCategoryError(err));
    // .finally(() => setCategoryloading(false));
  }, []);

  const handleCategoryNext = () => {
    const nextIndex = (categoryBatchIndex + 1) % categoryDetails.length;
    setCategoryBatchIndex(nextIndex);
    setCategoryCurrentBatch(categoryDetails[nextIndex]);
  };

  const handleCategoryPrev = () => {
    const prevIndex =
      (categoryBatchIndex - 1 + categoryDetails.length) %
      categoryDetails.length;
    setCategoryBatchIndex(prevIndex);
    setCategoryCurrentBatch(categoryDetails[prevIndex]);
  };

  const categoryIcons = {
    Camera: <FaCamera />,
    CellPhone: <FaMobileAlt />,
    Tablet: <FaTabletAlt />,
    Computer: <FaDesktop />,
    Headphone: <FaHeadphones />,
    Gamepad: <FaGamepad />,
    TV: <FaTv />,
    Speaker: <FaVolumeUp />,
    Watch: <FaClock />,
    Shirt: <FaTshirt />,
    Shoes: <FaShoePrints />,
    Hat: <FaHatCowboy />,
    Microwave: <FaMicrophone />,
    Refrigerator: <FaSnowflake />,
    Fan: <FaFan />,
    Blender: <FaBlender />,
    Drone: <FaRobot />,
    "Toy Car": <FaCar />,
    Puzzle: <FaPuzzlePiece />,
    "Teddy Bear": <FaChild />,
    Doll: <FaChild />,
    LEGO: <FaPuzzlePiece />,
    Books: <FaBook />,
    Notebook: <FaBook />,
    Stationery: <FaPen />,
    Calculator: <FaCalculator />,
    "Laptop Bag": <FaLuggageCart />,
  };

  useEffect(() => {
    fetchProducts("/Goods/Detail.json");
  }, [fetchProducts]);

  return (
    <div className="space-y-10">
      {/* Flash Sales Section */}
      <section className=" space-y-10 mt-10">
        <div className="flex space-x-2 mx-auto w-[80%]">
          <div className="w-4 h-7 rounded-md bg-red-600"></div>
          <p className="text-rose-600 text-[10px] flex items-center">Today's</p>
        </div>

        <div className="flex justify-between items-center mx-auto w-[80%]">
          <div className="font-semibold text-3xl flex gap-4 items-end">
            <p className="mr-8">Flash Sales</p>
            <Timer duration={2 * 24 * 60 * 60 * 1000} display2={"none"} />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevFlashBatch}
              className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
            >
              <img src={LeftArrow} alt="Left" className="w-4 h-4" />
            </button>
            <button
              onClick={nextFlashBatch}
              className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
            >
              <img src={RightArrow} alt="Right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 ">
            <div className="animate-spin h-16 w-16 border-t-4 border-b-4 rounded-full border-gray-300"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error.message}</div>
        ) : showAllFlash ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {AllItems.map((item, idx) => (
              <Card key={idx} {...item} />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 px-2 scroll-container no-scrollbar"
            style={{
              whiteSpace: "nowrap",
              scrollBehavior: "auto",
              scrollSnapType: "x mandatory",
            }}
          >
            {flashCurrentBatch.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-[260px] inline-block">
                <Card {...item} />
              </div>
            ))}
          </div>
        )}

        <div className="grid justify-center mt-6">
          <button
            className="bg-red-600 text-white rounded-sm text-xs p-4"
            onClick={() => setShowAllFlash(!showAllFlash)}
          >
            {showAllFlash ? "Back to Scrolling" : "View All Products"}
          </button>
        </div>
        <div className="border-b-1 border-gray-300 "></div>
      </section>

      {/* Categories Section */}
      <section className="w-[80%] mx-auto space-y-10">
        <div className="items-center space-y-7">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-7 bg-red-600 rounded-md"></div>
            <p className="text-rose-600 text-[10px]">Categories</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold text-3xl flex gap-4 items-end">
              <p className="mr-8">Browse By Category</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCategoryPrev}
                className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
              >
                <img src={LeftArrow} alt="Left" className="w-4 h-4" />
              </button>
              <button
                onClick={handleCategoryNext}
                className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
              >
                <img src={RightArrow} alt="Right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {categoryError ? (
          <div className="text-red-500 text-center">
            {categoryError.message}
          </div>
        ) : (
          <div className="flex gap-4">
            {categoryCurrentBatch.map((cat, idx) => (
              <button
                key={idx}
                className="border border-gray-300 w-full text-center py-4 rounded"
              >
                <div className="flex flex-col items-center space-y-2">
                  {categoryIcons[cat.name] ? (
                    <div className="text-4xl">{categoryIcons[cat.name]}</div>
                  ) : (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-[60px] w-[60px] mx-auto object-cover"
                    />
                  )}
                  <div className="text-sm font-medium">{cat.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="border-b-1 border-gray-300 mb-19"></div>
      </section>

      {/* This month section */}
      <section>
        <div className="mx-auto w-[80%] space-y-10 mt-10">
          <div className="flex space-x-2">
            <div className="w-4 h-7 rounded-md bg-red-600"></div>
            <p className="text-rose-600 text-[10px] flex items-center">
              This Month
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">Best Selling Products</p>
            <div className="flex space-x-4">
              <button
                className="bg-red-600 text-white rounded-sm text-xs p-4"
                onClick={() => setShowAllMonth(!showAllMonth)}
              >
                {showAllMonth ? "minimize" : "View All Products"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-16 w-16 border-t-4 border-b-4 rounded-full border-gray-300"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error.message}</div>
          ) : showAllMonth ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
              {AllItems.map((item, idx) => (
                <Card key={idx} {...item} hidePercentageOff />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 ">
              {monthCurrentBatch.map((item, idx) => (
                <div key={idx} className="flex mx-auto w-full">
                  <Card {...item} hidePercentageOff />
                </div>
              ))}
            </div>
          )}

          {/* category of 1 */}
          <div className="">
            {error ? (
              <div className=" text-center">{error.message}</div>
            ) : (
              <div className="mx-auto">
                {monthSingleBatch.map((single, idx) => (
                  <div key={idx} className="w-full mb-5 mt-20 bg-black text-white flex justify-between">
                    <div className="font-semibold grid m-10 mr-0 space-y-5">
                      <p className="text-green-400">Category</p>
                      <p className="text-5xl ">{single.Discountdescription}</p>
                      <Timer
                        duration={2 * 24 * 60 * 60 * 1000}
                        display1={"none"}
                      />
                      <button className="bg-green-400 p-2 w-[100px] h-[40px]">
                        Buy Now
                      </button>
                    </div>
                    <div>
                      <img
                        key={idx}
                        src={single.image}
                        alt={single.name}
                        className="h-[350px] w-[700px] mt-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ******* products*/}
      <section className="space-y-10 mt-20 w-[80%] mx-auto">
        <div className="flex space-x-2">
          <div className="w-4 h-7 rounded-md bg-red-600"></div>
          <p className="text-rose-600 text-[10px] flex items-center">
            Our Products
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-semibold text-3xl flex gap-4 items-end">
            <p className="mr-8">Explore Our Products</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevProductBatch}
              className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
            >
              <img src={LeftArrow} alt="Left" className="w-4 h-4" />
            </button>
            <button
              onClick={nextProductBatch}
              className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center"
            >
              <img src={RightArrow} alt="Right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-16 w-16 border-t-4 border-b-4 rounded-full border-gray-300"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error.message}</div>
        ) : showAllProduct ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {AllItems.map((item, idx) => (
              <Card key={idx} {...item} hidePercentageOff />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productCurrentBatch.map((item, idx) => (
              <div key={idx}>
                <Card {...item} hidePercentageOff />
              </div>
            ))}
          </div>
        )}

        <div className="grid justify-center mt-6">
          <button
            className="bg-red-600 text-white rounded-sm text-xs p-4"
            onClick={() => setShowAllProduct(!showAllProduct)}
          >
            {showAllProduct ? "view Less Products" : "View All Products"}
          </button>
        </div>
        <div className="border-b-1 border-gray-300 "></div>
      </section>

      {/* new arival     */}
      <section className="mx-auto space-y-10 mt-10 w-[80%]">
        <div className="flex space-x-2">
          <div className="w-4 h-7 rounded-md bg-red-600"></div>
          <p className="text-rose-600 text-[10px] flex items-center">
            Featured
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-semibold text-3xl flex gap-4 items-end">
            <p className="mr-8">New Arrival</p>
          </div>
        </div>

        <div className="flex space-x-5 justify-between items-center w-full ">
          <div className="relative bg-black h-[616px] w-[50%] flex justify-end items-center">
            {error ? (
              <div className=" text-center">{error.message}</div>
            ) : (
              <div>
                {monthSingleBatch.map((single, idx) => (
                  <div key={idx}>
                    <img
                      key={idx}
                      src={single.image}
                      alt={single.name}
                      className="h-[400px]"
                    />
                    <div className="absolute left-10 bottom-10 text-white w-[50%] space-y-7">
                      <p className="text-3xl">Play Station 5</p>
                      <p>{single.Productdescription}</p>
                      <button className="font-semibold underline">
                        shop Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              {error ? (
                <div className=" text-center">{error.message}</div>
              ) : (
                <div className="bg-black flex justify-end">
                  {monthSingleBatch.map((single, idx) => (
                    <div key={idx}>
                      <img
                        key={idx}
                        src={single.image}
                        alt={single.name}
                        className="h-[300px] p-5"
                      />
                      <div className="absolute left-10 bottom-7 text-white w-[40%] space-y-7">
                        <p className="text-3xl">{single.name}</p>
                        <p>{single.Productdescription}</p>
                        <button className="font-semibold underline">
                          shop Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-4 w-full">
              <div className="relative">
                {error ? (
                  <div className=" text-center">{error.message}</div>
                ) : (
                  <div className="bg-black">
                    {monthSingleBatch.map((single, idx) => (
                      <div key={idx}>
                        <img
                          key={idx}
                          src={single.image}
                          alt={single.name}
                          className="h-[300px] p-5"
                        />
                        <div className="absolute left-5 bottom-1 text-white w-[70%] space-y-3">
                          <p className="text-2xl">{single.name}</p>
                          <p>{single.Productdescription}</p>
                          <button className="font-semibold underline">
                            shop Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                {error ? (
                  <div className=" text-center">{error.message}</div>
                ) : (
                  <div className="bg-black">
                    {monthSingleBatch.map((single, idx) => (
                      <div key={idx}>
                        <img
                          key={idx}
                          src={single.image}
                          alt={single.name}
                          className="h-[300px] p-5"
                        />
                        <div className="absolute left-5 bottom-1 text-white w-[70%] space-y-3">
                          <p className="text-2xl">{single.name}</p>
                          <p>{single.Productdescription}</p>
                          <button className="font-semibold underline">
                            shop Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="flex justify-between items-center mt-20 w-[60%] mx-auto mb-20">
        {[
          {
            icon: <FaShippingFast size={32} />,
            title: "FREE AND FAST DELIVERY",
            desc: "Free delivery for all orders over $140",
          },
          {
            icon: <FaHeadset size={32} />,
            title: "24/7 CUSTOMER SERVICE",
            desc: "Friendly 24/7 customer support",
          },
          {
            icon: <FaMoneyBillWave size={32} />,
            title: "MONEY BACK GUARANTEE",
            desc: "We return money within 30 days",
          },
        ].map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
              <span className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3">
                {service.icon}
              </span>
            </div>
            <p className="text-2xl font-semibold mt-2">{service.title}</p>
            <p>{service.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Sections;
