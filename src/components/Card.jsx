import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';

function Card({name, price, discountedPrice, image, rating, ratingCount, onLove, onView,hidePercentageOff }) {
    const percentageOff = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <div className=" rounded-lg shadow-md relative md:w-full md:mx-0 ">
      {!hidePercentageOff && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          - {percentageOff}%
        </div>
      )}
      <div className="absolute  right-1 top-5 grid gap-1">
        <button onClick={onLove} aria-label="Add to wishlist">
          <AiOutlineHeart className="text-black hover:text-red-600 bg-white rounded-full p-1" size={24} />
        </button>
        <button onClick={onView} aria-label="View again">
          <AiOutlineEye className="text-black hover:text-blue-500 bg-white rounded-full p-1" size={24} />
        </button>
      </div>
      <div className='bg-gray-300'><img src={image} alt={name} className=" h-40 object-cover rounded mx-auto w-full p-7" /></div>
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