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
  const { cartItems, user,removeFromCart } = useAuthStore();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [saveForCheckout, setSaveForCheckout] = useState(false);

  // Static shipping cost
  const shippingFee = 1000;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const grandTotal = subtotal + shippingFee - discountAmount;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
      <div className="absolute top-2 right-4 sm:top-4 sm:right-8 z-10">
        <span className="text-sm sm:text-lg font-semibold text-gray-700 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow">
          {`Welcome${user?.name ? ` ${user.name}` : ""}`}
        </span>
      </div>

      {/* Main Checkout Wrapper */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 p-4 w-[95%] sm:w-[70%] mx-auto">
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">Checkout</h2>

          {/* Dynamic input generation */}
          {[
            { label: "First Name", name: "firstname" },
            { label: "Country", name: "country" },
            { label: "Street", name: "street" },
            { label: "Town/City", name: "city" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Address", name: "address" },
            { label: "Apartment (optional)", name: "apartment", required: false },
            { label: "Bank Info", name: "bank" },
          ].map(({ label, name, type = "text", required = true }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="md:w-[500px] w-full bg-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
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

        <div className="w-full lg:w-1/2 p-6 rounded shadow-md grid items-start gap-4 max-w-[400px]">
          <h3 className="text-lg sm:text-xl font-semibold">Your Items</h3>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-3">
                <div className="relative flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded bg-black"
                  />
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-white hover:text-red-600 bg-black rounded-full w-6 h-6 flex justify-center items-center absolute -top-2 -left-2"
                  >
                    ×
                  </button>
                  <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-red-600">
                  ${item.discountedPrice} × {item.quantity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}

          {/* Totals */}
          <div className="space-y-2 text-xs sm:text-sm text-gray-700 mt-4">
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
            <div className="flex justify-between font-bold text-sm sm:text-base border-t pt-2">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Field */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border px-4 py-2 rounded flex-1"
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
                    <div className="flex gap-2 ml-6 sm:ml-10">
                      {[Bank1, Bank2, Bank3, Bank4].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Bank ${i + 1}`}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
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