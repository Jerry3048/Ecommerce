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
      <div className="space-y-12 flex w-[80%] mx-auto justify-between items-center h-[70vh]">
        {/* Contact Details Section */}
        <div className="max-w-[30%]">
            <div className="bg-white rounded shadow p-6 text-center space-y-4">
            
              <p className=" space-y-3 text-sm">
                <p className="flex items-center gap-5"><FaPhone className="text-2xl text-white bg-red-600 rounded-full w-10 h-10 p-2" /> <p className="font-bold">Call To Us</p></p>
                <p className="flex items-start">We are available 24/7, 7 days a week</p>
                    <p className="flex items-start">
                        Phone:
                        <a href="tel:+2348000000000" className="text-blue-600">+234 800 000 0000</a>
                    </p>
              </p>
            <hr className="text-gray-400"></hr>
          
            <p className=" space-y-3 text-sm">
                <p className="flex items-center gap-5"><FaEnvelope className="text-2xl text-white bg-blue-600 rounded-lg w-10 h-10 p-2" /> <p className="font-bold">write To Us</p></p>
                <p className="flex items-start">Fill out our form and we will contact you within 24 hours</p>
                    <p className="flex items-start">
                        Email:
                        <a href="mailto:customer@yourcompany.com" className="text-blue-600">
                          customer@exclusive.com
                        </a>
                    </p>
                    <p className="flex items-start">
                        Email:
                        <a href="mailto:support@yourcompany.com" className="text-blue-600">
                          support@exclusive.com
                        </a>
                    </p>
              </p>
            </div>
        </div>

        <div className="w-[65%]">
            {!submitted ? (
            // Contact Form
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded shadow p-8 grid gap-6"
            >
                <h2 className="text-2xl font-semibold text-center">
                Send Us a Message
                </h2>
    
               <div className="flex gap-5 items-center">
                    {/* Name */}
                    <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="p-3 bg-gray-200 rounded w-full"
                    required
                    />
        
                    {/* Email */}
                    <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="p-3 bg-gray-200 rounded w-full"
                    required
                    />
        
                    {/* Phone */}
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
                rows="5"
                className="p-3 bg-gray-200 rounded w-full"
                required
                />
    
                {/* Submit Button */}
               <p className="flex justify-end">
                    <button
                    type="submit"
                    className="bg-red-600 w-[20%] text-white py-3 rounded hover:bg-red-700 font-semibold"
                    >
                    Send Message
                    </button>
               </p>
            </form>
            ) : (
            // Chat Confirmation UI after form submission
            <div className="bg-white p-6 rounded shadow text-center space-y-4">
                <h2 className="text-2xl font-bold text-green-600">Message Sent!</h2>
                <p>Hi {form.name}, thanks for reaching out.</p>
    
                <div className="bg-gray-100 p-4 rounded text-left space-y-3">
                <p>
                    <strong>You:</strong> {form.message}
                </p>
                <p>
                    <strong>Customer Care:</strong> Hello {form.name}, we've received your
                    message. We'll get back to you shortly at{" "}
                    <span className="text-blue-600">{form.email}</span> or{" "}
                    <span className="text-blue-600">{form.phone}</span>.
                </p>
                </div>
    
                <button
                onClick={() => {
                    setForm(true);
                    setSubmitted(false);
                }}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
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