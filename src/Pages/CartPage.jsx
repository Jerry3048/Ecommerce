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
      <div className="flex w-[80%] mx-auto">
        <NavLink to="/">Home</NavLink> /{" "}
        <NavLink to="/CartPage" className="font-semibold">
          Cart
        </NavLink>
      </div>

      {/* Main Cart Section */}
      <div className="w-[70%] mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-5xl min-h-[500px]">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {/* Table Header */}
            <div className="flex justify-between items-center px-10 py-5 font-semibold">
              <p className="w-[10%]">Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {/* Cart Items */}
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-10 py-5 shadow-lg"
              >
                {/* Product info */}
                <div className="relative flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded bg-black"
                  />
                  {/* Remove from cart button */}
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-white hover:text-red-600 bg-black rounded-full w-7 h-7 flex justify-center items-center absolute top-1"
                  >
                    x
                  </button>
                  <h3 className="font-medium">{item.name}</h3>
                </div>

                {/* Price */}
                <p className="text-red-600 text-sm">
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

                {/* Item subtotal */}
                <p className="text-xl font-bold">
                  ${(item.discountedPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Totals & Coupon Section */}
            <div className="flex justify-between">
              {/* Coupon input */}
              <div className="flex gap-7 h-10">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border px-4 py-2 rounded"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  Apply
                </button>
              </div>

              {/* Summary box */}
              <div className="flex-col items-end justify-end border p-7 px-4 space-y-4 w-[300px]">
                <p className="text-2xl font-semibold">Cart Total</p>

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
                <div className="flex justify-between text-xl pt-4">
                  <p>Total:</p>
                  <p>${grandTotal.toFixed(2)}</p>
                </div>

                {/* Checkout button */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleCheckout}
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

      <Footer />
    </div>
  );
}

export default CartPage;