// Import necessary modules and components
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { NavLink } from "react-router";
import SideImg from "/assets/arrow/Side Image (1).png";
import {
  FaHome,
  FaDollarSign,
  FaShoppingBag,
  FaCoins,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaShippingFast,
  FaHeadset,
  FaMoneyBillWave,
} from "react-icons/fa";

// Swiper for team slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Static list of team members
const teamMembers = [
  {
    name: "Tolulope Arewa",
    position: "Frontend Developer",
    image: "/assets/TeamImage/image 46.png",
    twitter: "https://twitter.com/tolulope",
    instagram: "https://instagram.com/tolulope",
    linkedin: "https://linkedin.com/in/tolulope",
  },
  // Repeated profiles
  {
    name: "Sandra Michael",
    position: "UI/UX Designer",
    image: "/assets/TeamImage/image 47.png",
    twitter: "https://twitter.com/sandram",
    instagram: "https://instagram.com/sandram",
    linkedin: "https://linkedin.com/in/sandramichael",
  },
  {
    name: "John Doe",
    position: "Backend Engineer",
    image: "/assets/TeamImage/image 51.png",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  // Duplicate for demonstration purposes
  {
    name: "Tolulope Arewa",
    position: "Frontend Developer",
    image: "/assets/team/tolu.jpg",
    twitter: "https://twitter.com/tolulope",
    instagram: "https://instagram.com/tolulope",
    linkedin: "https://linkedin.com/in/tolulope",
  },
  {
    name: "Sandra Michael",
    position: "UI/UX Designer",
    image: "/assets/team/sandra.jpg",
    twitter: "https://twitter.com/sandram",
    instagram: "https://instagram.com/sandram",
    linkedin: "https://linkedin.com/in/sandramichael",
  },
  {
    name: "John Doe",
    position: "Backend Engineer",
    image: "/assets/team/john.jpg",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
];

export default function About() {
  return (
    <div className="space-y-7">
      {/* Navigation */}
      <Nav />

     {/* Breadcrumb */}
<div className="flex w-[90%] mx-auto text-sm md:text-base mb-4">
  <NavLink to="/">Home</NavLink> /{" "}
  <NavLink to="/About" className="font-semibold">
    About
  </NavLink>
</div>

{/* Our Story Section */}
<div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto">
  <div className="p-6 md:pl-20 max-w-full md:max-w-[50%] space-y-5 text-center md:text-left">
    <p className="text-2xl md:text-3xl font-bold">Our Story</p>
    <p>
      Launched in 2015, Exclusive is South Asia's premier online shopping
      marketplace with an active presence in Bangladesh. Supported by a wide
      range of tailored marketing, data and service solutions, Exclusive has
      10,500 sellers and 300 brands and serves 3 million customers across the
      region.
    </p>
    <p>
      Exclusive has more than 1 Million products to offer, growing very fast.
      Exclusive offers a diverse assortment in categories ranging from consumer
      goods to electronics.
    </p>
  </div>
  <img
    src={SideImg}
    alt="Side"
    className="w-[80%] md:w-[40%] mt-6 md:mt-0"
  />
</div>

{/* Company Metrics */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-[90%] mx-auto">
  {[
    { icon: <FaHome size={32} />, value: "10.5k", label: "Sellers active on our site" },
    { icon: <FaDollarSign size={32} />, value: "33k", label: "Monthly Product Sale" },
    { icon: <FaShoppingBag size={32} />, value: "45.5k", label: "Active Customers" },
    { icon: <FaCoins size={32} />, value: "25k", label: "Annual Gross Sales" },
  ].map((metric, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center border border-gray-300 p-4 rounded-lg"
    >
      <div className="bg-gray-400 w-16 h-16 rounded-full flex justify-center items-center">
        <span className="text-white bg-black rounded-full w-12 h-12 flex justify-center items-center p-2">
          {metric.icon}
        </span>
      </div>
      <p className="text-xl font-semibold mt-3">{metric.value}</p>
      <p className="text-sm text-center">{metric.label}</p>
    </div>
  ))}
</div>

{/* Team Section with Swiper */}
<div className="mt-20 w-[90%] mx-auto">
  <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={30}
    slidesPerView={3}
    pagination={false} // disable dots
    navigation={false} // disable arrows
    autoplay={{ delay: 3000 }}
    breakpoints={{
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
  >
    {teamMembers.map((member, idx) => (
      <SwiperSlide key={idx}>
        <div className="text-center space-y-4 mt-10">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-[400px] mx-auto bg-gray-200 p-5 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
          </div>
          <div className="flex justify-center gap-4 text-xl">
            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

{/* Services Section */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 w-[90%] mx-auto mb-20">
  {[
    { icon: <FaShippingFast size={32} />, title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over $140" },
    { icon: <FaHeadset size={32} />, title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support" },
    { icon: <FaMoneyBillWave size={32} />, title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days" },
  ].map((service, idx) => (
    <div key={idx} className="flex flex-col items-center text-center">
      <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
        <span className="text-white bg-black rounded-full w-12 h-12 flex justify-center items-center p-3">
          {service.icon}
        </span>
      </div>
      <p className="text-xl md:text-2xl font-semibold mt-2">{service.title}</p>
      <p className="text-sm">{service.desc}</p>
    </div>
  ))}
</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
