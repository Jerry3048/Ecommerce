import { useAuthStore } from "../store/Authstore";
import Nav from "../components/Nav";

function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist } = useAuthStore();

  return (
    <div>
      <Nav />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed Items</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">No items viewed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item, idx) => (
              <div key={idx} className="bg-white border rounded-lg shadow-sm p-4 relative">
                <button
                  onClick={() => removeFromWishlist(item.name)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  ✕
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-3 font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-orange-600 font-bold mr-2">
                    ${item.discountedPrice}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${item.price}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < item.rating ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({item.ratingCount})
                  </span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;