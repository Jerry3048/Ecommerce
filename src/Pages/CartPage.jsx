import { useState } from "react";
import { useAuthStore } from "../store/Authstore";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { NavLink, useNavigate } from "react-router";

function CartPage() {
  const navigate = useNavigate();

  // Get data and actions from global auth/cart store
  const { cartItems, updateCartQuantity, removeFromCart, user } = useAuthStore();

  // --------------------------
  // Local State
  // --------------------------
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingFee = 5; // Flat shipping fee

  // --------------------------
  // Handlers
  // --------------------------

  // Quantity change handler
  const handleQuantityChange = (e, name) => {
    const qty = parseInt(e.target.value);
    if (!isNaN(qty) && qty > 0) {
      updateCartQuantity(name, qty);
    }
  };

  // Coupon logic
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscount(0.1); // 10% off
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
    setCouponCode("");
  };

  // Checkout navigation
  const handleCheckout = () => {
    if (!user) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/signup");
      return;
    }
    navigate("/checkout");
  };

  // --------------------------
  // Calculations
  // --------------------------
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal + shippingFee - discountAmount;

  return (
    <div className="space-y-10">
      <Nav />

     {/* Breadcrumb */}
    <div className="flex w-[90%] mx-auto text-sm md:text-base mb-4">
      <NavLink to="/">Home</NavLink> /{" "}
      <NavLink to="/CartPage" className="font-semibold">
        Cart
      </NavLink>
    </div>

    {/* Main Cart Section */}
    <div className="w-[90%] mx-auto">
      {cartItems.length === 0 ? (
        <p className="text-3xl md:text-5xl min-h-[300px] flex items-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Table Header (hidden on mobile) */}
          <div className="hidden md:flex justify-between items-center px-4 md:px-10 py-5 font-semibold">
            <p className="w-[20%]">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {/* Cart Items */}
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0 px-4 md:px-10 py-5 shadow-lg rounded-lg"
            >
              {/* Product info */}
              <div className="relative flex items-center gap-3 w-full md:w-[30%]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded bg-black"
                />
                {/* Remove from cart button */}
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="absolute -top-2 -left-2 text-white hover:text-red-600 bg-black rounded-full w-6 h-6 flex justify-center items-center"
                >
                  ×
                </button>
                <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
              </div>

              {/* Price */}
              <p className="text-red-600 text-sm md:text-base">
                ${item.discountedPrice} each
              </p>

              {/* Quantity */}
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item.name)}
                className="w-16 border px-2 py-1 rounded text-center"
              />

              {/* Subtotal */}
              <p className="text-lg md:text-xl font-bold">
                ${(item.discountedPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          {/* Totals & Coupon Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-6">
            {/* Coupon input */}
            <div className="flex flex-col sm:flex-row gap-4 w-full h-fit md:w-[50%]">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 border px-4 py-2 rounded"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Apply
              </button>
            </div>

            {/* Summary box */}
            <div className="border p-6 space-y-4 w-full md:w-[350px] rounded-lg">
              <p className="text-xl md:text-2xl font-semibold">Cart Total</p>

              {/* Subtotal */}
              <div className="flex justify-between font-medium text-gray-700">
                <p>Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>

              {/* Shipping */}
              <div className="flex justify-between font-medium text-gray-700">
                <p>Shipping:</p>
                <p>${shippingFee.toFixed(2)}</p>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <p>Coupon Discount:</p>
                  <p>− ${discountAmount.toFixed(2)}</p>
                </div>
              )}

              {/* Grand total */}
              <div className="flex justify-between text-lg md:text-xl pt-4">
                <p>Total:</p>
                <p>${grandTotal.toFixed(2)}</p>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 text-center"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      <Footer />
    </div>
  );
}

export default CartPage;