import { useState } from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart,AiOutlineEye } from 'react-icons/ai';
import { useAuthStore } from "../store/Authstore";

function Card({name, price, discountedPrice, image, rating, ratingCount, onLove, onView, onCart,hidePercentageOff }) {
   const item = { name, price, discountedPrice, image, rating, ratingCount };
   const { addToCart, toggleWishlist, } = useAuthStore();
   const percentageOff = Math.round(((price - discountedPrice) / price) * 100);
   const [loved, setLoved] = useState(false);
   const [viewed, setViewed] = useState(false);
   const[carted, setCarted]= useState(false)

  return (
    <div className=" rounded-lg shadow-md relative md:w-full md:mx-0 ">
      {!hidePercentageOff && percentageOff > 0 && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          - {percentageOff}%
        </div>
      )}

      
      <div className="absolute right-1 top-5 grid gap-1">
        {/* Heart Icon */}
        <button
          onClick={() => {
            setLoved(!loved);
            onLove && onLove(); // trigger external handler
            toggleWishlist(item); // add to wishlist
          }}
          aria-label="Add to wishlist"
        >
          <AiOutlineHeart
            className={`bg-white rounded-full p-1 ${
              loved ? " text-red-600" : "text-black"
            }`}
            size={24}
          />
        </button>

        {/* Eye Icon */}
        <button
          onClick={() => {
            setViewed(!viewed);
            onView && onView(); // trigger external handler
            addToCart(item)
          }}
          aria-label="View again"
        >
          <AiOutlineEye
            className={`bg-white rounded-full p-1 ${
              viewed ? " text-red-600" : "text-black"
            }`}
            size={24}
          />
        </button>

        <button
          onClick={() => {
            setCarted(!carted);
            onCart && onCart(); // trigger external handler
            addToCart(item)
          }}
          aria-label="View again"
        >
          <AiOutlineShoppingCart
            className={`bg-white rounded-full p-1 ${
              carted ? " text-red-600" : "text-black"
            }`}
            size={24}
          />
        </button>
      </div>
      <div className='bg-gray-300'><img src={image} alt={name} className=" h-70  rounded mx-auto w-full  p-5" /></div>
      <div className='w-[80%] mx-auto'>
          <h3 className="mt-2 text-lg font-semibold">{name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-orange-600 text-xl font-bold mr-2">
              ${discountedPrice}
            </span>
            <span className="text-gray-400 line-through text-sm">
              ${price}
            </span>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-yellow-600" : "text-gray-400"}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">({ratingCount})</span>
          </div>
      </div>
    </div>
  );
}

export default Card;