import { useState } from "react";
import { useAuthStore } from "../store/Authstore";
import Nav from "../components/Nav";
import { NavLink } from "react-router";

function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart } = useAuthStore();
  
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); 
  const shippingFee = 5; 

  const handleQuantityChange = (e, name) => {
    const qty = parseInt(e.target.value);
    if (!isNaN(qty) && qty > 0) {
      updateCartQuantity(name, qty);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% off
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
    setCouponCode("")
  };

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal + shippingFee - discountAmount;

  return (
    <div className="space-y-10">
      <Nav />

      <div className="flex w-[80%] mx-auto">
        <NavLink to="/">Home</NavLink> /{" "}
        <NavLink to="/CartPage" className="font-semibold">
          Cart
        </NavLink>
      </div>

      <div className="w-[70%] mx-auto">
        <div className="flex justify-between items-center px-10 py-5 font-semibold">
          <p className="w-[10%]">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-10 py-5 shadow-lg"
              >
                <div className="relative flex items-center gap-2 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded bg-black"
                  />
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-white hover:text-red-600 capitalize bg-black rounded-full w-7 h-7 flex justify-center items-center absolute top-1"
                  >
                    x
                  </button>
                  <h3 className="font-medium">{item.name}</h3>
                </div>

                <p className="text-red-600 text-sm">
                  ${item.discountedPrice} each
                </p>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.name)}
                  className="w-16 border px-2 py-1 rounded text-center"
                />

                <p className="text-xl font-bold">
                  ${(item.discountedPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

               <div className="flex justify-between"> 
                 <div className="flex  gap-7 h-10">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="border px-4 py-2 rounded "
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                  >
                    Apply
                  </button>
                </div>
  
              
             
  
               <div className="flex-col items-end justify-end border p-7 px-4 space-y-4 w-[300px]">
                  <p className="text-2xl font-semibold">Cart Total</p>
                  <div className="flex justify-between font-medium text-gray-700">
                    <p>Subtotal:</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
    
                  <div className="flex justify-between font-medium text-gray-700">
                    <p>Shipping:</p>
                    <p>${shippingFee.toFixed(2)}</p>
                  </div>
    
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <p>Coupon Discount:</p>
                      <p>− ${discountAmount.toFixed(2)}</p>
                    </div>
                  )}
    
                  <div className="flex justify-between text-xl pt-4">
                    <p>Total:</p>
                    <p>${grandTotal.toFixed(2)}</p>
                  </div>
                   <div className="flex justify-center items-center">
                     <button
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 text-center"
                    >
                      Proceed to checkout
                    </button>
                   </div>
                </div>
               </div>
             </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;