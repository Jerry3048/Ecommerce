import { useState } from "react";
import Nav from "../components/Nav";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer"

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  
  const [submitted, setSubmitted] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", form);
    setSubmitted(true);
  };
  

  return (
    <div className="space-y-10">
        <Nav/>
      <div className="space-y-8 md:space-y-0 md:flex w-[90%] md:w-[80%] mx-auto justify-between items-start md:items-center md:h-[70vh]">
        {/* Contact Details Section */}
        <div className="w-full md:max-w-[35%]">
          <div className="bg-white rounded shadow p-4 sm:p-6 text-center space-y-6">
            {/* Call Section */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 sm:gap-5">
                <FaPhone className="text-xl sm:text-2xl text-white bg-red-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-2" />
                <p className="font-bold">Call To Us</p>
              </div>
              <p className="text-gray-600">We are available 24/7, 7 days a week</p>
              <p>
                Phone:{" "}
                <a href="tel:+2348000000000" className="text-blue-600 break-words">
                  +234 800 000 0000
                </a>
              </p>
            </div>

            <hr className="text-gray-300" />

            {/* Email Section */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 sm:gap-5">
                <FaEnvelope className="text-xl sm:text-2xl text-white bg-blue-600 rounded-lg w-8 h-8 sm:w-10 sm:h-10 p-2" />
                <p className="font-bold">Write To Us</p>
              </div>
              <p className="text-gray-600">
                Fill out our form and we will contact you within 24 hours
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:customer@exclusive.com"
                  className="text-blue-600 break-words"
                >
                  customer@exclusive.com
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@exclusive.com"
                  className="text-blue-600 break-words"
                >
                  support@exclusive.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[60%]">
          {!submitted ? (
            // Contact Form
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded shadow p-4 sm:p-8 grid gap-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center">
                Send Us a Message
              </h2>

              {/* Input fields - stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="p-3 bg-gray-200 rounded w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="p-3 bg-gray-200 rounded w-full"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="p-3 bg-gray-200 rounded w-full"
                  required
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="p-3 bg-gray-200 rounded w-full"
                required
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 w-full sm:w-[40%] text-white py-3 rounded hover:bg-red-700 font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          ) : (
            // Chat Confirmation UI
            <div className="bg-white p-4 sm:p-6 rounded shadow text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-600">
                Message Sent!
              </h2>
              <p className="text-sm sm:text-base">
                Hi {form.name}, thanks for reaching out.
              </p>

              <div className="bg-gray-100 p-3 sm:p-4 rounded text-left space-y-3 text-sm sm:text-base max-h-60 overflow-y-auto">
                <p>
                  <strong>You:</strong> {form.message}
                </p>
                <p>
                  <strong>Customer Care:</strong> Hello {form.name}, we've received
                  your message. We'll get back to you shortly at{" "}
                  <span className="text-blue-600">{form.email}</span> or{" "}
                  <span className="text-blue-600">{form.phone}</span>.
                </p>
              </div>

              <button
                onClick={() => {
                  setForm(true);
                  setSubmitted(false);
                }}
                className="mt-4 bg-red-500 text-white px-4 sm:px-6 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}