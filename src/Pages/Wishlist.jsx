import { useAuthStore } from "../store/Authstore";
import { useProductStore } from "../store/Productstore";
import Nav from "../components/Nav";
import { AiOutlineDelete,AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState  } from "react";
import  Footer  from "../components/Footer";
import { useNavigate } from 'react-router';

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, addToCart, removeFromWishlist } = useAuthStore();
  const { products, fetchProducts, loading, error } = useProductStore();
  const [showAllMonth, setShowAllMonth] = useState(false);


    useEffect(() => {
    fetchProducts("/Goods/Detail.json");
  }, [fetchProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;


  return (
    <div className="space-y-">
      <Nav />
      <div className="p-6 w-[80%] mx-auto space-y-5">
        <h2 className="text-2xl font-bold mb-6">Recently Liked Items</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">No items viewed yet.</p>
        ) : (
          <div className="space-y-20">
            <div className="text-2xl flex ">
              <p>wishlist</p>
              <p className="text-2xl font-bold">({wishlist.length})</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 3xl:grid-cols-5">
              {wishlist.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded-lg shadow-sm p-4 relative"
                >
                  <button
                    onClick={() => removeFromWishlist(item.name)}
                    className="absolute top-2 right-2 text-red-600 bg-white w-10 h-10 hover:text-red-700 rounded-full flex justify-center items-center"
                    title="Remove"
                  >
                    <AiOutlineDelete size={24} className="" />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 rounded bg-black"
                  />
                  <h3 className="mt-3 font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-orange-600 font-bold mr-2">
                      ${item.discountedPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                  >
                    <AiOutlineShoppingCart className="inline mr-2" size={24} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[80%] mx-auto space-y-5">
        <div className="space-y-10 mt-10">
          <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-4 h-7 rounded-md bg-red-600"></div>
            <p className="text-black text-[20px] flex items-center">
              Just For You
            </p>
          </div>
            <div className="flex space-x-4">
              <button
                className="bg-red-600 text-white rounded-sm text-xs p-4"
                onClick={() => setShowAllMonth(!showAllMonth)}
              >
                {showAllMonth ? "minimize" : "See All"}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 3xl:grid-cols-5">
          {(showAllMonth ? products : products.slice(0, 8)).map(
            (product, id) => (
              <div
              key={id}
              className="bg-white border rounded-lg shadow-sm p-4 relative"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40  rounded bg-black"
              />
              <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
              <div className="flex items-center mt-2">
                <span className="text-orange-600 font-bold mr-2">
                  ${product.discountedPrice}
                </span>
              </div>
            
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigating when adding to cart
                  addToCart(product);
                }}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                <AiOutlineShoppingCart className="inline mr-2" size={24} />
                Add to Cart
              </button>
            </div>
            )
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Wishlist;
