import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/Authstore";

// Bank logos for payment method visuals
import Bank1 from "/assets/arrow/image 32.png";
import Bank2 from "/assets/arrow/image 31.png";
import Bank3 from "/assets/arrow/image 33.png";
import Bank4 from "/assets/arrow/image 30.png";

// Initial form state
const initialState = {
  firstname: "",
  country: "",
  street: "",
  city: "",
  phone: "",
  email: "",
  address: "",
  apartment: "",
  bank: "",
  paymentMethod: "card",
  coupon: "",
};

function Checkout() {
  const { cartItems, user,removeFromCart } = useAuthStore(); // Auth store for user & cart data

  // -------------------------------
  // State declarations
  // -------------------------------
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [saveForCheckout, setSaveForCheckout] = useState(false);

  // Static shipping cost
  const shippingFee = 1000;

  // -------------------------------
  // Derived totals
  // -------------------------------
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const grandTotal = subtotal + shippingFee - discountAmount;

  // -------------------------------
  // Handle input changes
  // -------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // Validate form inputs
  // -------------------------------
  const validate = () => {
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = "First name is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.street) newErrors.street = "Street is required";
    if (!form.city) newErrors.city = "Town/City is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.email) newErrors.email = "Email address is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.bank) newErrors.bank = "Bank info is required";
    return newErrors;
  };

  // -------------------------------
  // Handle coupon logic
  // -------------------------------
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscountRate(0.1);
      alert("Coupon applied! 10% discount.");
    } else {
      setDiscountRate(0);
      alert("Invalid coupon code.");
    }
    setCouponCode("");
  };

  // -------------------------------
  // Handle form submission
  // -------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const orderData = {
        ...form,
        cartItems,
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: grandTotal,
      };
      console.log("Checkout Data:", orderData);
      alert("Order submitted! Check console for full data.");
      setForm(initialState);
      setDiscountRate(0);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Nav />

      {/* Welcome badge */}
      <div className="absolute top-4 right-8 z-10">
        <span className="text-lg font-semibold text-gray-700 bg-white px-4 py-2 rounded shadow">
          {`Welcome${user?.name ? ` ${user.name}` : ""}`}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between p-4 w-[80%] mx-auto">

        {/* ===============================
            Left: Checkout Form
        ================================ */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-center">Checkout</h2>

          {/* Dynamic input generation */}
          {[
            { label: "First Name", name: "firstname" },
            { label: "Country", name: "country" },
            { label: "Street", name: "street" },
            { label: "Town/City", name: "city" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Address", name: "address" },
            {
              label: "Apartment (optional)",
              name: "apartment",
              required: false,
            },
            { label: "Bank Info", name: "bank" },
          ].map(({ label, name, type = "text", required = true }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {required && errors[name] && (
                <p className="text-red-500 text-xs">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Save info checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveForCheckout"
              checked={saveForCheckout}
              onChange={() => setSaveForCheckout((prev) => !prev)}
              className="h-4 w-4"
            />
            <label htmlFor="saveForCheckout" className="text-sm">
              Save this information for faster checkout next time
            </label>
          </div>
        </form>

        {/* ===============================
            Right: Cart Summary + Payment
        ================================ */}
        <div className="p-6 rounded shadow-md w-full max-w-lg grid items-center">
          <h3 className="text-lg font-semibold">Your Items</h3>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-3">
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
                <p className="text-sm text-red-600">
                  ${item.discountedPrice} × {item.quantity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}

          {/* Totals */}
          <div className="space-y-2 text-sm text-gray-700 mt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Coupon Discount:</span>
                <span>− ${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Code Field */}
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border px-4 py-2 rounded w-full"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Apply
            </button>
          </div>

          {/* Payment Method Options */}
          <div className="mt-4">
            <label className="block font-medium mb-2">Payment Method</label>
            <div className="flex flex-col gap-3">
              {[
                { value: "card", label: "Card", icon: null },
                {
                  value: "bank",
                  label: "Bank Transfer",
                  icon: (
                    <div className="flex gap-2 ml-10">
                      {[Bank1, Bank2, Bank3, Bank4].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Bank ${i + 1}`}
                          className="w-10 h-10 object-contain"
                        />
                      ))}
                    </div>
                  ),
                },
                { value: "cod", label: "Pay on Delivery", icon: null },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded cursor-pointer ${
                    form.paymentMethod === option.value
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={form.paymentMethod === option.value}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="flex items-center">
                    {option.label}
                    {option.icon}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700 font-semibold mt-6"
          >
            Submit Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;