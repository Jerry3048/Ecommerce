import { useState, useEffect } from "react";
import RightArrow from "/assets/arrow/rightarrowblk.png";
import LeftArrow from "/assets/arrow/leftarrowblk.png";
import Card from "../components/Card";
import axios from "axios";
import { useRef } from "react";
import { FaShippingFast, FaHeadset, FaMoneyBillWave } from "react-icons/fa";



function Timer({duration}) {
     const scrollRef = useRef(null);

  const [time, setTime] = useState(duration);
  const [flashDetails, setFlashDetails] = useState([]);
  const [flashCurrentBatch, setFlashCurrentBatch] = useState([]);
  const [flashBatchIndex, setFlashBatchIndex] = useState(0);
  const [AllItems, setAllItems] = useState([]);
  const [showAllFlash, setShowAllFlash] = useState(false);
  

  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categoryCurrentBatch, setCategoryCurrentBatch] = useState([]);
  const [categoryBatchIndex, setCategoryBatchIndex] = useState(0);
  const [categoryError, setCategoryError] = useState(null);

  
  const [monthCurrentBatch, setMonthCurrentBatch] = useState([]);
  const [monthSingleBatch, setMonthSingleBatch] = useState([]); 
  const [showAllMonth,setShowAllMonth] = useState(false);


  //  const [ProductBatch, setProductBatch] = useState([]);
   const [showAllProduct,setShowAllProduct] = useState(false);
   const [ProductDetails, setProductDetails] = useState([]);
  const [ProductCurrentBatch, setProductCurrentBatch] = useState([]);
  const [ProductBatchIndex, setProductBatchIndex] = useState(0)


  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
 

  
  

  // Helper functions
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

  const getFormattedTime = (milliseconds) => {
    const total_seconds = Math.floor(milliseconds / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_hours = Math.floor(total_minutes / 60);
    const days = Math.floor(total_hours / 24);

    const seconds = total_seconds % 60;
    const minutes = total_minutes % 60;
    const hours = total_hours % 24;

    return { days, hours, minutes, seconds };
  };

  const timeParts = getFormattedTime(time);

  // Flash sales
  useEffect(() => {
    axios
      .get("/Goods/Detail.json")
      .then((res) => {
        const shuffled = shuffleArray(res.data);
        const batches = getBatches(shuffled, 8);
        setFlashDetails(batches);
        setFlashCurrentBatch(batches[0] || []);

        const shuffled2 = shuffleArray(res.data);
        const batches2 = getBatches(shuffled2, 4);
        setMonthCurrentBatch(batches2[0] || []);


        const shuffled3 = shuffleArray(res.data);
        const batches3 = getBatches(shuffled3, 1);
        setMonthSingleBatch(batches3[0] || []);

        const shuffled4 = shuffleArray(res.data);
        const batches4 = getBatches(shuffled4, 8);
        setProductDetails(batches4);
        setProductCurrentBatch(batches4[0] || []);


        setAllItems(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);



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


  const handleFlashNext = () => {
    const nextIndex = (flashBatchIndex + 1) % flashDetails.length;
    setFlashBatchIndex(nextIndex);
    setFlashCurrentBatch(flashDetails[nextIndex]);
  };

  const handleFlashPrev = () => {
    const prevIndex = (flashBatchIndex - 1 + flashDetails.length) % flashDetails.length;
    setFlashBatchIndex(prevIndex);
    setFlashCurrentBatch(flashDetails[prevIndex]);
  };


   // product
  const handleProductNext = () => {
    const nextIndex = (ProductBatchIndex + 1) % ProductDetails.length;
    setProductBatchIndex(nextIndex);
    setProductCurrentBatch(ProductDetails[nextIndex]);
  };

  const handleProductPrev = () => {
    const prevIndex = (ProductBatchIndex - 1 + ProductDetails.length) % ProductDetails.length;
    setProductBatchIndex(prevIndex);
    setProductCurrentBatch(ProductDetails[prevIndex]);
  };


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
      
      .catch((err) => setCategoryError(err))
      // .finally(() => setCategoryLoading(false));
  }, []);

  const handleCategoryNext = () => {
    const nextIndex = (categoryBatchIndex + 1) % categoryDetails.length;
    setCategoryBatchIndex(nextIndex);
    setCategoryCurrentBatch(categoryDetails[nextIndex]);
  };

  const handleCategoryPrev = () => {
    const prevIndex = (categoryBatchIndex - 1 + categoryDetails.length) % categoryDetails.length;
    setCategoryBatchIndex(prevIndex);
    setCategoryCurrentBatch(categoryDetails[prevIndex]);
  };


   return (
    <div className="space-y-10">

        {/* Flash Sales Section */}
        <div className="mx-auto w-[80%] space-y-10 mt-10">
          <div className="flex space-x-2">
            <div className="w-4 h-7 rounded-md bg-red-600"></div>
            <p className="text-rose-600 text-[10px] flex items-center">Today's</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold text-3xl flex gap-4 items-end">
              <p className="mr-8">Flash Sales</p>
              <div className="flex flex-col items-center">
                <span className="text-[11px]">Days</span>
                <span>{timeParts.days}</span>
              </div>
              <span className="text-orange-500 text-3xl mx-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-xs">Hours</span>
                <span>{timeParts.hours}</span>
              </div>
              <span className="text-orange-500 text-3xl mx-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-xs">Minutes</span>
                <span>{timeParts.minutes}</span>
              </div>
              <span className="text-orange-500 text-3xl mx-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-xs">Seconds</span>
                <span>{timeParts.seconds}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button onClick={handleFlashPrev} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                <img src={LeftArrow} alt="Left" className="w-4 h-4" />
              </button>
              <button onClick={handleFlashNext} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                <img src={RightArrow} alt="Right" className="w-4 h-4" />
              </button>
            </div>
          </div>

        
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-16 w-16 border-t-4 border-b-4 rounded-full border-gray-300"></div>
            </div>
          ) : Error ? (
            <div className="text-red-500 text-center">{Error.message}</div>
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
           style={{ whiteSpace: "nowrap", scrollBehavior: "auto", scrollSnapType: "x mandatory"}}
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
        </div>

        {/* Categories Section */}
        <div className="w-[80%] mx-auto space-y-10">
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
              <button onClick={handleCategoryPrev} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                <img src={LeftArrow} alt="Left" className="w-4 h-4" />
              </button>
              <button onClick={handleCategoryNext} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                <img src={RightArrow} alt="Right" className="w-4 h-4" />
              </button>
            </div>
          </div>
          </div>

          {categoryError ? (
            <div className="text-red-500 text-center">{categoryError.message}</div>
          ) : (
            <div className="flex gap-4">
              {categoryCurrentBatch.map((cat, idx) => (
                <div
                  key={idx}
                  className={`border border-gray-300 w-full text-center py-2 ${
                    cat.name === "Camera" ? "bg-red-500 text-white" : ""
                  }`}
                >
                  <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-[100px] w-[100px] mx-auto rounded object-cover"
                    />
                  <div>{cat.name}</div>
                </div>
              ))}
            </div>
          )}
          <div className="border-b-1 border-gray-300 mb-19"></div>
        </div>

        {/* This month section */}
        <div>
            <div className="mx-auto w-[80%] space-y-10 mt-10">
              <div className="flex space-x-2">
                <div className="w-4 h-7 rounded-md bg-red-600"></div>
                <p className="text-rose-600 text-[10px] flex items-center">This Month</p>
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
              ) : Error ? (
                <div className="text-red-500 text-center">{Error.message}</div>
              ) : showAllMonth ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                  {AllItems.map((item, idx) => (
                    <Card key={idx} {...item} hidePercentageOff/>
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
               <div className= "w-full mb-5 mt-20 bg-black text-white flex justify-between">

                    <div className="font-semibold grid m-10 mr-0 space-y-5">
                        <p className="text-green-400">Category</p>
                        <p className="text-5xl ">
                          Enhance Your Music Experience 
                        </p>
                    
                        <div className="font-semibold text-2xl text-black flex gap-4 items-end mb-10">
                            <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                              <span>{timeParts.days}</span>
                              <span className="text-[11px]">Days</span>
                            </div>
              
                            <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                              <span>{timeParts.hours}</span>
                              <span className="text-[11px]">Hours</span>
                            </div>
                
                            <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                              <span>{timeParts.minutes}</span>
                              <span className="text-[11px]">Minutes</span>
                            </div>
                
                            <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                              <span className="">{timeParts.seconds}</span>
                              <span className="text-[11px]">Seconds</span>
                            </div>
                        </div>
                        <button className="bg-green-400 p-2 w-[100px] h-[40px]">Buy Now</button>
                    </div>


                    <div className="">
                        
                        {Error ? (
                          <div className=" text-center">{Error.message}</div>
                            ) : (
                            <div className="mx-auto">
                              {monthSingleBatch.map((single, idx) => (
                              
                                  <img
                                      key = {idx}
                                      src={single.image}
                                      alt={single.name}
                                      className="h-[350px] w-[700px] mt-10"
                                    />
                              ))}
                            </div>
                        )}
                    </div>

                 </div>
            </div>
        </div>

             {/* ******* products*/}
            <div className="space-y-10 mt-20 w-[80%] mx-auto">
              <div className="flex space-x-2">
                <div className="w-4 h-7 rounded-md bg-red-600"></div>
                <p className="text-rose-600 text-[10px] flex items-center">Our Products</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-semibold text-3xl flex gap-4 items-end">
                  <p className="mr-8">Explore Our Products</p>
                </div>

                <div className="flex space-x-4">
                  <button onClick={handleProductPrev} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                    <img src={LeftArrow} alt="Left" className="w-4 h-4" />
                  </button>
                  <button onClick={handleProductNext} className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                    <img src={RightArrow} alt="Right" className="w-4 h-4" />
                  </button>
                </div>
              </div>

            
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin h-16 w-16 border-t-4 border-b-4 rounded-full border-gray-300"></div>
                </div>
              ) : Error ? (
                <div className="text-red-500 text-center">{Error.message}</div>
              ) : showAllProduct ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AllItems.map((item, idx) => (
                    <Card key={idx} {...item} hidePercentageOff/>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ProductCurrentBatch.map((item, idx) => (
                    <div key={idx}>
                      <Card {...item} hidePercentageOff/>
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
            </div>

        {/* new arival     */}
            <div className="mx-auto space-y-10 mt-10 w-[80%]">
              <div className="flex space-x-2">
                <div className="w-4 h-7 rounded-md bg-red-600"></div>
                <p className="text-rose-600 text-[10px] flex items-center">Featured</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-semibold text-3xl flex gap-4 items-end">
                  <p className="mr-8">New Arrival</p>
                </div>
             </div>

        
          <div className="flex space-x-5 justify-between items-center w-full ">
                <div className="relative bg-black h-[616px] w-[50%] flex justify-end items-center">
                    
                    {Error ? (
                      <div className=" text-center">{Error.message}</div>
                        ) : (
                        <div className="">
                          {monthSingleBatch.map((single, idx) => (
                          
                          <img
                              key = {idx}
                              src={single.image}
                              alt={single.name}
                              className="h-[400px] "
                            />
                          ))}
                        </div>
                    )}
                    <div className="absolute left-10 bottom-10 text-white w-[40%] space-y-7">
                      <p className="text-3xl">Play Station 5</p>
                      <p>black and white version of the PS5 coming out on sale</p>
                      <button className="font-semibold underline">shop Now</button>
                    </div>
                </div>


            
              <div className="grid grid-cols-1 gap-4" >

                  <div className="relative">
                      
                        {Error ? (
                          <div className=" text-center">{Error.message}</div>
                            ) : (
                            <div className="bg-black flex justify-end">
                              {monthSingleBatch.map((single, idx) => (
                              
                                  <img
                                      key = {idx}
                                      src={single.image}
                                      alt={single.name}
                                      className="h-[300px]"
                                    />
                              ))}
                            </div>
                        )}
                        <div className="absolute left-10 bottom-7 text-white w-[40%] space-y-7">
                          <p className="text-3xl">Play Station 5</p>
                          <p>black and white version of the PS5 coming out on sale</p>
                          <button className="font-semibold underline">shop Now</button>
                        </div>
                    
                    </div>

                    <div className="flex space-x-4 w-full">
                      <div className="relative">
                          
                          {Error ? (
                            <div className=" text-center">{Error.message}</div>
                              ) : (
                              <div className="">
                                {monthSingleBatch.map((single, idx) => (
                                
                                    <img
                                        key = {idx}
                                        src={single.image}
                                        alt={single.name}
                                        className="h-[300px] w-full"
                                      />
                                ))}
                              </div>
                          )}
                          <div className="absolute left-5 bottom-1 text-white w-[70%] space-y-3">
                            <p className="text-2xl">Play Station 5</p>
                            <p>black and white version of the PS5 coming out on sale</p>
                            <button className="font-semibold underline">shop Now</button>
                          </div>
                      </div>

                      <div className="relative">
                        
                        {Error ? (
                          <div className=" text-center">{Error.message}</div>
                            ) : (
                            <div className="">
                              {monthSingleBatch.map((single, idx) => (
                              
                                  <img
                                      key = {idx}
                                      src={single.image}
                                      alt={single.name}
                                      className="h-[300px]"
                                    />
                              ))}
                            </div>
                        )}
                          <div className="absolute left-5 bottom-1 text-white w-[70%] space-y-3">
                            <p className="text-2xl">Play Station 5</p>
                            <p>black and white version of the PS5 coming out on sale</p>
                            <button className="font-semibold underline">shop Now</button>
                          </div>
                      </div>
                  </div>
              </div>

            </div>
          </div>

        {/* service section */}
        <div className="flex justify-between items-center mb-50 mt-20 w-[60%] mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
                    <FaShippingFast size={32} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold">FREE AND FAST DELIVERY</p>
                <p>Free delivery for all orders over $140</p>
              </div>
                 <div className="flex flex-col items-center">
                <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
                    <FaHeadset size={32} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold">24/7 CUSTOMER SERVICE</p>
                <p>Friendly 24/7 customer support</p>
              </div>
                <div className="flex flex-col items-center">
                <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
                    <FaMoneyBillWave size={32} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold">MONEY BACK GUARANTEE</p>
                <p>we return money within 30 days</p>
              </div> 
        </div>

       

    </div>
  );
}

export default Timer