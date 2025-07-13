import { useAuthStore } from "../store/Authstore";
import Nav from "../components/Nav";

function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart,} = useAuthStore();

  const handleQuantityChange = (e, name) => {
    const qty = parseInt(e.target.value);
    if (!isNaN(qty) && qty > 0) {
      updateCartQuantity(name, qty);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  return (
   <div>
        <Nav />
        <div className="p-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
    
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b py-4">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-red-600 text-sm">${item.discountedPrice} each</p>
                      <p className="text-sm text-gray-700 line-through">${item.price}</p>
                    </div>
                  </div>
    
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.name)}
                      className="w-16 border px-2 py-1 rounded text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
    
              <div className="flex justify-end pt-6">
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
   </div>
  );
}

export default CartPage;