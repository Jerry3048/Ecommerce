import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';

function Card({name, price, discountedPrice, image, rating, ratingCount, onLove, onView }) {
    const percentageOff = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md relative md:w-full md:mx-0">
       <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
       - {percentageOff}% 
      </div>  
      <div className="absolute  right-2 top-20 grid gap-4">
        <button onClick={onLove} aria-label="Add to wishlist">
          <AiOutlineHeart className="text-gray-500 hover:text-red-600 bg-white rounded-full p-1" size={22} />
        </button>
        <button onClick={onView} aria-label="View again">
          <AiOutlineEye className="text-gray-500 hover:text-blue-500 bg-white rounded-full p-1" size={22} />
        </button>
      </div>
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
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
              <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
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