import { useState,useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useParams } from "react-router";
import { useProductStore } from "../store/Productstore";
import { useAuthStore } from "../store/Authstore";
import { useNavigate } from "react-router";


export default function ProductPage() {
  const navigate = useNavigate();
    const {id}= useParams()
    const { products, fetchProducts} = useProductStore();
    const { toggleWishlist,addToCart } = useAuthStore();

 
    const [product, setCountryData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [colour, setColour] = useState("");
    const [liked, setLiked] = useState(false);
  

    const handleBuyNow = () => {
      addToCart({ ...product, quantity: 1 }); // or quantity: product.quantity if available
      navigate("/checkout");
    };

  useEffect(() => {
    fetchProducts("/Goods/Detail.json");
  }, [fetchProducts]); // This runs once to load the products
  
  useEffect(() => {
    if (products.length > 0 && id) {
      const decodeName = decodeURIComponent(id);
      const selected = products.find((item) => item.id === decodeName || item.name === decodeName);
      setCountryData(selected || null);
    }
  }, [id, products]);


  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0] || "");
      setColour(product.availableColors?.[0] || "");
    }
  }, [product]);


  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  if (!product) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading product...</div>;
  }

  return (
   <div className="space-y-7">
    <Nav/>
        <div className="w-[80%] mx-auto p-10 flex items-center  gap-10 h-[70vh]">
          {/* Images */}
          <div className="flex gap-4">
            <div className="grid gap-4">
                {product.views.map((img, i) => (
                    <img
                    key={i}
                    src={img}
                    alt="thumb"
                   
                    className='h-[13vh] bg-gray-200 cursor-pointer p-1'
                    />
                ))}
    
            </div>
          
            <img
              src={product.image}
              alt="Product"
              className=" h-[59vh] w-[70%] rounded shadow bg-gray-200 p-6"
            />
           
          </div>
    
          {/* Product Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                            key={i}
                            className={`text-yellow-500 ${i < Math.floor(product.rating) ? "" : "opacity-30"}`}
                            />
                        ))}
                       <span className="text-sm text-gray-500">({product.ratingCount} reviewers)</span>
                    </div>
                <p className="text-xl text-red-600 font-semibold">${product.discountedPrice}</p>
                <p className="text-sm text-gray-600 max-w-[70%]">{product.Productdescription}</p>
               
              </div>
            </div>

            <hr className="w-[70%] text-gray-400"></hr>

            <div>
              <p className="font-medium mb-2">Colours:</p>
              <div className="flex gap-3">
              {Array.isArray(product.availableColors) &&
                product.availableColors.map((c) => (
                    <button
                    key={c}
                    onClick={() => setColour(c)}
                    style={{
                        padding: "8px 16px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor: colour === c ? "#dc2626" : "#f3f3f3",
                        color: colour === c ? "#fff" : "#000",
                    }}
                    >
                    {c}
                    </button>
                ))}
              </div>
            </div>
    
            {/* Size Options */}
            <div>
              <p className="font-medium mb-2">Select Size:</p>
              <div className="flex gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded ${
                      size === s ? "bg-red-600 text-white" : "bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
    
            {/* Quantity & Buy Button */}
            <div className="flex items-center gap-5">
              <div className="flex items-center border rounded border-gray-400">
                <button onClick={() => handleQuantityChange("dec")} className="px-2 text-lg font-bold border-gray-400 border-r hover:bg-red-600">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => handleQuantityChange("inc")} className="px-2 text-lg font-bold border-l  border-gray-400 hover:bg-red-600">+</button>
              </div>
    
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-1 rounded font-semibold"
               onClick={handleBuyNow}
               >
                Buy Now
              </button>
               
                 <FaHeart
                size={28}
                className={`cursor-pointer ${liked ? "text-red-600" : "text-gray-400"}`}
                onClick={() => {
                    setLiked(!liked);
                    toggleWishlist(product); // add to wishlist
                  }}
              />
            </div>
          </div>
        </div>
        <Footer/>
   </div>
  );
}