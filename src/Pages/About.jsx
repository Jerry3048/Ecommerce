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
      <div className="flex w-[80%] mx-auto">
        <NavLink to="/">Home</NavLink> / <NavLink to="/About" className="font-semibold">About</NavLink>
      </div>

      {/* Our Story Section */}
       <div className="flex items-center justify-between">
           <div className="p-10 pl-40 max-w-[50%] grid justify-center items-center space-y-7">
                <p className="text-3xl font-bold">Our Story</p>
                <p>Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
           </div>
           <img src={SideImg} alt="Side" className="w-[40%]" />
       </div>

      {/* Company Metrics */}
      <div className="flex justify-between items-center mt-20 w-[70%] mx-auto">
        {[
          { icon: <FaHome size={32} />, value: "10.5k", label: "Sellers active on our site" },
          { icon: <FaDollarSign size={32}/>, value: "33k", label: "Monthly Product Sale" },
          { icon: <FaShoppingBag  size={32}/>, value: "45.5k", label: "Active Customers" },
          { icon: <FaCoins size={32} />, value: "25k", label: "Annual Gross Sales" },
        ].map((metric, idx) => (
          <div key={idx} className="flex flex-col items-center border border-gray-400 p-2">
            <div className="bg-gray-400 w-17 h-17 rounded-full flex justify-center items-center">
                <span className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3">
                  {metric.icon}
                </span>
            </div>
            <p className="text-2xl font-semibold text-center">{metric.value}</p>
            <p className="text-sm text-center">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section with Swiper */}
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="text-center space-y-4 mt-20">
                <img src={member.image} alt={member.name} className="w-100 h-100 mx-auto bg-gray-500 p-5 " />
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
                <div className="flex justify-center gap-4 text-xl">
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaTwitter /></a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"><FaLinkedin /></a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services Section */}
      <div className="flex justify-between items-center mt-20 w-[60%] mx-auto mb-20">
        {[ 
          { icon: <FaShippingFast size={32} />, title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over $140" },
          { icon: <FaHeadset size={32} />, title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support" },
          { icon: <FaMoneyBillWave size={32} />, title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days" },
        ].map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center">
               <span className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3">
                  {service.icon }
                </span>
            </div>
            <p className="text-2xl font-semibold mt-2">{service.title}</p>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
